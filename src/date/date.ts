import { pipe } from '@smidhonza/pipe';
import { isNumber } from '../typeHelpers';
import { pad } from '../utils';
import { DateTime } from 'luxon';

/**
 *
 * @param {string | number} dateString
 * @return {Date}
 */
export const toDate = (dateString: string | number) => new Date(dateString);

/**
 * Převede datum do časové zóny
 *
 * @param {string} timeZone
 * @return {(date: Date) => Date}
 */
export const withTimezone =
  (timeZone: string) =>
  (date: Date): Date =>
    toDate(date.toLocaleString('en-US', { timeZone }));

/**
 * Převede text na datum podle vybrané časové zóny
 * Používá formát knihovny luxon
 *
 * @param {string} date Datum, který chceme převést
 * @param {string} format Formát, ve kterém je datum zapsán. (Např: 'DD.MM.YYYY HH:mm') Celý formát zde: https://moment.github.io/luxon/#/parsing?id=table-of-tokens
 * @param {string} timezone Časová zóna, ve které je datum zapsáno. (Např: "Europe/Prague")
 */
export const parseDate = (date: string, format: string, timezone: string): Date => {
  return DateTime.fromFormat(date, format, { zone: timezone }).toJSDate();
};

/**
 * Lidsky čitelný čas (formát "DD-MM-YYYY hh:mm") s přesností na minuty
 *
 * @param {Date} date
 * @return {string} naformátovaný čas
 * @deprecated Nově by se měla používat funkce ToReadable, která bere v úvahu timezone.
 */
export const toStringDateTime = (date: Date): string => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const isValidDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const toMilliSeconds = (seconds: number): number => seconds * 1000;

export function toSeconds(date: Date): number;
export function toSeconds(milliseconds: number): number;
export function toSeconds(date: number | Date): number {
  if (isNumber(date)) {
    return Math.floor(date / 1000);
  }
  return Math.floor(date.getTime() / 1000);
}

export const dateToTimestamp = (date: Date) => pipe(date.getTime(), toSeconds);
export const secondsToDate = (seconds: number): Date => pipe(seconds, toMilliSeconds, toDate);

/**
 *  Add seconds in given timezone
 */
export const addSeconds = (value: number, timezone: string, date: Date): Date => DateTime.fromJSDate(date, { zone: timezone }).plus({ seconds: value }).toJSDate();
/**
 *  Add days in given timezone
 */
export const addDays = (value: number, timezone: string, date: Date): Date => DateTime.fromJSDate(date, { zone: timezone }).plus({ days: value }).toJSDate();

/**
 *  Adds one day in given timezone.
 */
export const addDay = (timezone: string, date: Date): Date => DateTime.fromJSDate(date, { zone: timezone }).plus({ days: 1 }).toJSDate();

/**
 *  Computes start of last week in given timezone.
 */
export const startOfLastWeek = (timezone: string): Date => DateTime.fromJSDate(new Date(), { zone: timezone }).minus({ days: 7 }).startOf('day').toJSDate();

/**
 * Computes start of current day in given time zone.
 */
export const startOfToday = (timezone: string): Date => DateTime.fromJSDate(new Date(), { zone: timezone }).startOf('day').toJSDate();

/**
 * Computes end of current day in given time zone.
 */
export const endOfToday = (timezone: string): Date => DateTime.fromJSDate(new Date(), { zone: timezone }).endOf('day').toJSDate();

/**
 * Computed X days back in the past. Returns start time of that day.
 *
 * @param {string} timezone
 * @param {number} days
 * @return {Date}
 */
export const startOfXDaysBefore = (timezone: string, days: number): Date => DateTime.fromJSDate(new Date(), { zone: timezone }).minus({ days }).startOf('day').toJSDate();

/**
 * Computed X weeks back in the past. Returns start time of that day.
 *
 * @param {string} timezone
 * @param {number} weeks
 * @return {Date}
 */
export const startOfXWeeksBefore = (timezone: string, weeks: number): Date => DateTime.fromJSDate(new Date(), { zone: timezone }).minus({ weeks }).startOf('day').toJSDate();

/**
 * Computed X months back in the past. Returns start time of that day.
 *
 * @param {string} timezone
 * @param {number} months
 * @return {Date}
 */
export const startOfXMonthsBefore = (timezone: string, months: number): Date => DateTime.fromJSDate(new Date(), { zone: timezone }).minus({ months }).startOf('day').toJSDate();

/**
 * Computed X time units back in the past. Returns start time of that day.
 *
 * @param {string} timezone
 * @param {number} count
 * @param {string} timeUnit
 * @return {Date}
 */
export const startOfXTimeUnitsBefore = (timezone: string, count: number, timeUnit: string): Date => {
  switch (timeUnit) {
    case 'days':
      return startOfXDaysBefore(timezone, count);
    case 'weeks':
      return startOfXWeeksBefore(timezone, count);
    default:
      return startOfXMonthsBefore(timezone, count);
  }
};

export const getNow = () => DateTime.utc().toJSDate();

/**
 * Prints time in human readable format (D.M.YYYY HH:mm) in given timezone.
 */
export const toReadable = (timezone: string, date: Date) => DateTime.fromJSDate(date, { zone: timezone }).toFormat('d.M.yyyy HH:mm');

/**
 * Prints time in human readable format (D.M.YYYY) in given timezone.
 */
export const toReadableDate = (timezone: string, date: Date): string => DateTime.fromJSDate(date, { zone: timezone }).toFormat('d.M.yyyy');

/**
 * Prints time in human readable format (YYYY-M-D) in given timezone.
 */
export const toDateString = (timezone: string, date: Date): string => DateTime.fromJSDate(date, { zone: timezone }).toFormat('yyyy-M-d');

/**
 * Prints time in human readable format (D.M. OR D.) in given timezone.
 */
export const toReadableShortened = (timezone: string, date: Date): string => {
  const d = DateTime.fromJSDate(date, { zone: timezone });
  return d.day === 1 ? d.toFormat('d.M.') : d.toFormat('d.');
};

/**
 * Prints time in ISO 8601 format (YYYY-MM-DDTHH-mm-ss±hh:mm) in given timezone.
 */
export const toISOStringWithOffset = (timezone: string, date: Date): string => DateTime.fromJSDate(date, { zone: timezone }).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");

/**
 * Returns array of months which includes two given dates.
 * E.g: For days 2.4.-3.6. It returns array of months: [2.4., 2.6.]
 */
export const getMonthsArray = (start: Date, end: Date): Date[] => {
  const tz = 'Europe/Prague';

  const x = DateTime.fromJSDate(start, { zone: tz });
  const y = DateTime.fromJSDate(end, { zone: tz });

  const startCorrected = x < y ? x : y;
  const endCorrected = x < y ? y : x;

  const a = startCorrected.startOf('day');
  const b = endCorrected;

  const add = (current: DateTime, days: DateTime[] = []): DateTime[] => {
    if (current < b.plus({ months: 1 })) {
      return add(current.plus({ months: 1 }), [...days, current]);
    }
    return days;
  };

  return add(a).map((x) => x.toJSDate());
};
