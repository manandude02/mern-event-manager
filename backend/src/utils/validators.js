const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const tz = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(tz);

function validateStartEndLocal(startLocal, endLocal, timezone) {
  // startLocal and endLocal are ISO strings without timezone OR with local => treat them as local in provided timezone
  const s = dayjs.tz(startLocal, timezone);
  const e = dayjs.tz(endLocal, timezone);
  if (!s.isValid() || !e.isValid()) return { ok: false, msg: 'Invalid date/time' };
  if (e.isBefore(s)) return { ok: false, msg: 'End must be after start' };
  return { ok: true, startUtc: s.utc().toDate(), endUtc: e.utc().toDate() };
}

module.exports = { validateStartEndLocal };
