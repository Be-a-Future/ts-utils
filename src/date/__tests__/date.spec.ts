import {
  addDay,
  addDays,
  addSeconds,
  dateToTimestamp,
  endOfToday,
  getNow,
  getMonthsArray,
  isValidDate,
  parseDate,
  secondsToDate,
  startOfLastWeek,
  startOfToday,
  startOfXDaysBefore,
  startOfXMonthsBefore,
  startOfXTimeUnitsBefore,
  startOfXWeeksBefore,
  toDate,
  toDateString,
  toISOStringWithOffset,
  toMilliSeconds,
  toReadable,
  toReadableDate,
  toReadableShortened,
  toSeconds,
  toStringDateTime,
  withTimezone,
} from '../../index';
import { DateTime } from 'luxon';

jest.useFakeTimers().setSystemTime(new Date(2022, 10, 12, 17, 23));
const TZ_LOCAL = 'Europe/Prague';

describe('date', () => {
  describe('Timezone in test', () => {
    it('should always be UTC', () => {
      expect(new Date().getTimezoneOffset()).toBe(0);
    });
  });

  describe('parseDate', () => {
    it('should parse date correctly', () => {
      // UTC +1
      expect(parseDate('1.3.2025 06:57', 'd.M.yyyy HH:mm', TZ_LOCAL)).toEqual(new Date('2025-03-01T05:57:00.000Z'));

      // UTC +2
      expect(parseDate('1.9.2025 06:57', 'd.M.yyyy HH:mm', TZ_LOCAL)).toEqual(new Date('2025-09-01T04:57:00.000Z'));
    });
  });

  describe('toDate', () => {
    it('should convert timestamp into Date', () => {
      expect(toDate(1_700_000_000_000)).toEqual(new Date(1_700_000_000_000));
    });
  });

  describe('withTimezone', () => {
    it('should convert date to a timezone-adjusted local date', () => {
      expect(withTimezone(TZ_LOCAL)(new Date('2022-11-12T17:23:00.000Z')).toISOString()).toEqual('2022-11-12T18:23:00.000Z');
    });
  });

  describe('toStringDateTime', () => {
    it('should print day month year with padded time', () => {
      expect(toStringDateTime(new Date(Date.UTC(2022, 0, 2, 3, 4)))).toEqual('2.1.2022 03:04');
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date strings', () => expect(isValidDate('2025-03-01T05:57:00.000Z')).toEqual(true));
    it('should return false for invalid date strings', () => expect(isValidDate('not-a-date')).toEqual(false));
  });

  describe('timestamp helpers', () => {
    it('should convert seconds to milliseconds', () => expect(toMilliSeconds(2)).toEqual(2000));
    it('should convert milliseconds to seconds', () => expect(toSeconds(2500)).toEqual(2));
    it('should convert date to seconds', () => expect(toSeconds(new Date(2500))).toEqual(2));
    it('should convert date to timestamp', () => expect(dateToTimestamp(new Date(2500))).toEqual(2));
    it('should convert seconds to date', () => expect(secondsToDate(2)).toEqual(new Date(2000)));
  });

  describe('getMonthsArray', () => {
    const october30 = new Date(2010, 9, 30, 22, 0, 0);
    const november4 = new Date(2010, 10, 4, 23, 0, 0);
    const november5 = new Date(2010, 10, 5, 23, 0, 0);
    const november6 = new Date(2010, 10, 6, 23, 0, 0);
    const december4 = new Date(2010, 11, 4, 23, 0, 0);

    it('return one month when range is same', () => {
      expect(getMonthsArray(november5, november5)).toEqual([november5]);
    });

    it('return two months.', () => {
      expect(getMonthsArray(november4, november5)).toEqual([november4, december4]);
    });

    it('return two months case 2.', () => {
      expect(getMonthsArray(november4, november6)).toEqual([november4, december4]);
    });

    it('return two months case 3.', () => {
      expect(getMonthsArray(october30, november5)).toEqual([october30, new Date(2010, 10, 29, 23, 0, 0)]);
    });

    it('return 2 months when reversed order input.', () => {
      expect(getMonthsArray(november6, november4)).toEqual([november4, december4]);
    });
    it('return 3 months.', () => {
      expect(getMonthsArray(october30, december4)).toEqual([new Date(2010, 9, 30, 22, 0, 0), new Date(2010, 10, 29, 23, 0, 0), new Date(2010, 11, 29, 23, 0, 0)]);
    });
  });

  describe('toReadable', () => {
    it('should print readable date correctly.', () => {
      expect(toReadable(TZ_LOCAL, new Date(2022, 10, 12, 17, 23))).toEqual('12.11.2022 18:23');
    });

    it('should print readable start of day correctly.', () => {
      expect(toReadable(TZ_LOCAL, new Date(2022, 10, 11, 23, 0))).toEqual('12.11.2022 00:00');
    });

    it('should print end of day correctly.', () => {
      expect(toReadable(TZ_LOCAL, new Date(2022, 10, 12, 23, 0))).toEqual('13.11.2022 00:00');
    });

    it('should print readableDate correctly.', () => {
      expect(toReadableDate(TZ_LOCAL, new Date(2022, 10, 12, 17, 23))).toEqual('12.11.2022');
    });

    it('should print end of day in readableDate correctly.', () => {
      expect(toReadableDate(TZ_LOCAL, new Date(2022, 10, 12, 23, 0))).toEqual('13.11.2022');
    });

    it('should print date string correctly.', () => {
      expect(toDateString(TZ_LOCAL, new Date(2022, 10, 12, 17, 23))).toEqual('2022-11-12');
    });
  });

  describe('toISOStringWithOffset', () => {
    const dateUTC = new Date(Date.UTC(2022, 10, 12, 23, 17, 23));
    const dateLocal = DateTime.fromISO('2022-11-12T23:17:23.000+01:00').toJSDate();

    it('should print UTC date ISO string with zero offset', () => expect(toISOStringWithOffset('UTC', dateUTC)).toEqual('2022-11-12T23:17:23+00:00'));
    it('should print local date ISO string with zero offset', () => expect(toISOStringWithOffset('UTC', dateLocal)).toEqual('2022-11-12T22:17:23+00:00'));
    it('should print UTC date ISO string with CET offset', () => expect(toISOStringWithOffset('Europe/Prague', dateUTC)).toEqual('2022-11-13T00:17:23+01:00'));
    it('should print local date ISO string with CET offset', () => expect(toISOStringWithOffset('Europe/Prague', dateLocal)).toEqual('2022-11-12T23:17:23+01:00'));
  });

  describe('toReadableShortened', () => {
    it('should print correctly.', () => {
      expect(toReadableShortened(TZ_LOCAL, new Date(2022, 10, 12, 17, 23))).toEqual('12.');
    });

    it('should print start of month correctly.', () => {
      expect(toReadableShortened(TZ_LOCAL, new Date(2022, 0, 31, 23, 0))).toEqual('1.2.');
    });
  });
  describe('startOfLastWeek', () => {
    it('should compute start of last week correctly.', () => {
      expect(startOfLastWeek(TZ_LOCAL).toISOString()).toEqual('2022-11-04T23:00:00.000Z');
    });
  });
  describe('startOfToday', () => {
    it('should compute start of current day correctly.', () => {
      expect(startOfToday(TZ_LOCAL).toISOString()).toEqual('2022-11-11T23:00:00.000Z');
    });
  });

  describe('endOfToday', () => {
    it('should compute end of current day correctly.', () => {
      expect(endOfToday(TZ_LOCAL).toISOString()).toEqual('2022-11-12T22:59:59.999Z');
    });
  });

  describe('startOfXWeeksBefore', () => {
    it('should compute start of 2 weeks before correctly.', () => {
      expect(startOfXWeeksBefore(TZ_LOCAL, 2).toISOString()).toEqual('2022-10-28T22:00:00.000Z');
    });
  });

  describe('startOfXDaysBefore', () => {
    it('should compute start of 2 days before correctly.', () => {
      expect(startOfXDaysBefore(TZ_LOCAL, 2).toISOString()).toEqual('2022-11-09T23:00:00.000Z');
    });
  });

  describe('startOfXMonthsBefore', () => {
    it('returns correct date', () => {
      expect(startOfXMonthsBefore(TZ_LOCAL, 0).toISOString()).toEqual('2022-11-11T23:00:00.000Z');
      expect(startOfXMonthsBefore(TZ_LOCAL, 1).toISOString()).toEqual('2022-10-11T22:00:00.000Z');
      expect(startOfXMonthsBefore(TZ_LOCAL, 2).toISOString()).toEqual('2022-09-11T22:00:00.000Z');
      expect(startOfXMonthsBefore(TZ_LOCAL, 8).toISOString()).toEqual('2022-03-11T23:00:00.000Z');
      expect(startOfXMonthsBefore(TZ_LOCAL, 10).toISOString()).toEqual('2022-01-11T23:00:00.000Z');
      expect(startOfXMonthsBefore(TZ_LOCAL, 12).toISOString()).toEqual('2021-11-11T23:00:00.000Z');
      expect(startOfXMonthsBefore(TZ_LOCAL, 14).toISOString()).toEqual('2021-09-11T22:00:00.000Z');
    });
  });

  describe('addSeconds', () => {
    const timeBeforeDTZChange = DateTime.fromJSDate(new Date(2010, 9, 31, 2, 58, 35))
      .setZone(TZ_LOCAL, { keepLocalTime: true })
      .toJSDate();

    const timeAfterDTZChange = DateTime.fromJSDate(new Date(2010, 9, 31, 2, 0, 5)).toJSDate();
    const october31 = new Date(2010, 9, 31, 22, 0, 0);
    const november1 = new Date(2010, 10, 1, 22, 0, 0);
    const november2 = new Date(2010, 10, 2, 22, 0, 0);
    const DAY_IN_SECONDS = 86400;

    it('should add "worth of day" seconds.', () => {
      expect(addSeconds(DAY_IN_SECONDS, TZ_LOCAL, november1)).toEqual(november2);
    });
    it('should remove "worth of day" seconds over month.', () => {
      expect(addSeconds(-DAY_IN_SECONDS, TZ_LOCAL, november1)).toEqual(october31);
    });
    it('should correctly add seconds over time change.', () => {
      expect(addSeconds(90, TZ_LOCAL, timeBeforeDTZChange)).toEqual(timeAfterDTZChange);
    });
  });

  describe('startOfXTimeUnitsBefore', () => {
    it('should delegate to day calculation', () => {
      expect(startOfXTimeUnitsBefore(TZ_LOCAL, 2, 'days').toISOString()).toEqual('2022-11-09T23:00:00.000Z');
    });

    it('should delegate to week calculation', () => {
      expect(startOfXTimeUnitsBefore(TZ_LOCAL, 2, 'weeks').toISOString()).toEqual('2022-10-28T22:00:00.000Z');
    });

    it('should fall back to month calculation', () => {
      expect(startOfXTimeUnitsBefore(TZ_LOCAL, 2, 'months').toISOString()).toEqual('2022-09-11T22:00:00.000Z');
    });
  });

  describe('getNow', () => {
    it('should return current time in UTC', () => {
      expect(getNow().toISOString()).toEqual('2022-11-12T17:23:00.000Z');
    });
  });

  describe('addDay', () => {
    const october31 = new Date(2010, 9, 31, 22, 0, 0);
    const november1 = new Date(2010, 10, 1, 22, 0, 0);
    const november2 = new Date(2010, 10, 2, 22, 0, 0);

    it('should add day.', () => {
      expect(addDay(TZ_LOCAL, november1)).toEqual(november2);
    });
    it('should add day over month.', () => {
      expect(addDay(TZ_LOCAL, october31)).toEqual(november1);
    });
  });

  describe('addDays', () => {
    const october31 = new Date(2010, 9, 31, 22, 0, 0);
    const november1 = new Date(2010, 10, 1, 22, 0, 0);
    const november3 = new Date(2010, 10, 3, 22, 0, 0);
    const november4 = new Date(2010, 10, 4, 22, 0, 0);

    it('should add 3 days.', () => {
      expect(addDays(3, TZ_LOCAL, november1)).toEqual(november4);
    });
    it('should add 3 days over month.', () => {
      expect(addDays(3, TZ_LOCAL, october31)).toEqual(november3);
    });
  });
});
