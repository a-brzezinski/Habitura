export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).toDateString();

export const datesAreEqual = (a: Date[], b: Date[]) => {
  if (a.length !== b.length) return false;

  const aSorted = a.map(normalizeDate).sort();
  const bSorted = b.map(normalizeDate).sort();

  return aSorted.every((date, i) => date === bSorted[i]);
};
