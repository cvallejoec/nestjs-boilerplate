/**
 * If the incomming date just have the date, it will add the timezone 00 to it
 * @param date
 * @returns Date
 */
export const initializeTimezone = (date: Date | string): Date => {
  const initializeDate = new Date(date);
  const userTimezoneOffset = initializeDate.getTimezoneOffset() * 60000;
  return new Date(initializeDate.getTime() - userTimezoneOffset);
};

export function convertDateToUTC(date: Date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
}
