export const formatToMMSS = (value: number) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor(value / 60) % 60;
  const seconds = value % 60;

  return [hours, minutes, seconds.toFixed(0)]
    .map((time) => (time < 10 ? "0" + time : time))
    .filter((time, idx) => time !== "00" || idx > 0)
    .join(":");
};
