import { create } from 'zustand';
import { produce } from 'immer';

export const useTrackingStore = create((set) => ({
    trackingData: {},
    startTracking: (strategyName, isBreak = false) => set(produce(state => {
        state.trackingData[strategyName] = { startTime: new Date(), isBreak };
    })),
    stopTracking: (strategyName) => set(produce(state => {
        const trackingData = state.trackingData[strategyName];
        if (trackingData?.startTime) {
            trackingData.endTime = new Date();
            trackingData.totalTime = (trackingData.endTime - trackingData.startTime) / 1000; // convert to seconds
        }
    })),
    storeTrackingData: async (strategyName, trackingData) => {
        const td = trackingData[strategyName]
        if (td) {
            console.log("td", td)
            console.log("stname", strategyName)
            try {
                await fetch('/api/storage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        strategyName,
                        td
                    })
                }).then(response => {
                    if (response.ok) {
                        // Request was successful
                        console.log('Data stored successfully');
                    } else {
                        // Request failed
                        console.error('Failed to store data');
                    }
                })
                    .catch(error => {
                        console.error('Error while making the request:', error);
                    });
            } catch (error) {
                console.error(`Failed to store tracking data: ${error}`);
            }
        }
    }
}));