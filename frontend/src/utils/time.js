import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

// convert local datetime (string) in timezone -> UTC ISO
export function localToUtcIso(localDateTimeString, tz) {
  // localDateTimeString: "2025-10-28T09:00" or ISO with offset
  return dayjs.tz(localDateTimeString, tz).utc().toISOString();
}

// convert stored UTC ISO -> formatted string in a profile timezone
export function utcToLocalString(utcIsoString, tz, format = 'YYYY-MM-DD HH:mm') {
  return dayjs.utc(utcIsoString).tz(tz).format(format);
}
