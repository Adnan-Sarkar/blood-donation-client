export const timeFormatter = (time: string) => {
  const date = new Date(time);

  const calculateHour = date.getHours() < 12 ? date.getHours() : (date.getHours() - 12);
  const hours = String(calculateHour === 0 ? 12 : calculateHour).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const am_pm = Number(date.getHours()) >= 12 ? "PM" : "AM"


  return `${hours}:${minutes} ${am_pm}`;
};