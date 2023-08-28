import { create } from 'zustand';
function logError(error) {
    console.error('Error:', error);
}
function createNewTrackingData(st, strategyName, data) {
    return {
        ...st,
        trackingData: {
            ...st.trackingData,
            [strategyName]: {
                ...st.trackingData[strategyName],
                ...data
            }
        }
    };
}
export const useTrackingStore = create(set => ({
    trackingData: {},
    startTracking: (strategyName, isBreak = false) =>
        set(st => createNewTrackingData(st, strategyName, { startTime: new Date(), isBreak })),
    stopTracking: (strategyName) =>
        set(st => {
            const { startTime } = st.trackingData[strategyName] || {};
            return startTime ? createNewTrackingData(st, strategyName, {
                endTime: new Date(),
                totalTime: Math.floor((new Date() - startTime) / 60000)
            }) : st;
        }),
    storeTrackingData: async (strategyName, trackingData, user, token) => {
        const td = trackingData[strategyName];
        if (td) {
            try {
                const response = await fetch('/api/storage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ strategyName, td, uid })
                });

                if (!response.ok) {
                    throw new Error('Failed to store data');
                }
            } catch (error) {
                logError(error);
            }
        }
    },
    handleTracking: (activeStrategy, trackingData, isActive, isBreak) => {
        if (!isActive && !isBreak) {
            set().storeTrackingData(activeStrategy, trackingData);
        } else if (isActive && !isBreak) {
            set().stopTracking(activeStrategy);
            set().storeTrackingData(activeStrategy, trackingData);
            set().startTracking(activeStrategy, true);
        } else if (isBreak) {
            set().stopTracking(activeStrategy);
            set().storeTrackingData(activeStrategy, trackingData);
        }
    }
}));