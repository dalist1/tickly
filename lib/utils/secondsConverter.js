export function convertSecondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  return minutes + "m";
}