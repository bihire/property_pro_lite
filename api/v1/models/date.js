let timezone_offset_min = new Date().getTimezoneOffset(),
  offset_hrs = parseInt(Math.abs(timezone_offset_min / 60)),
  offset_min = Math.abs(timezone_offset_min % 60),
  timezone_standard;

if (offset_hrs < 10) offset_hrs = `0${offset_hrs}`;

if (offset_min < 10) offset_min = `0${offset_min}`;

// Add an opposite sign to the offset
// If offset is 0, it means timezone is UTC
if (timezone_offset_min < 0) timezone_standard = `+${offset_hrs}:${offset_min}`;
else if (timezone_offset_min > 0) timezone_standard = `-${offset_hrs}:${offset_min}`;
else if (timezone_offset_min == 0) timezone_standard = 'Z';

// Timezone difference in hours and minutes
// String such as +5:30 or -6:00 or Z

// Returns the given integer as a string and with 2 digits
// For example: 7 --> "07"
const ConvertNumberToTwoDigitString = n => {
  return n > 9 ? "" + n : "0" + n;
};

const today = new Date();
const date = today.toISOString().slice(0, 10);
const time = `${ConvertNumberToTwoDigitString(today.getHours())}:${ConvertNumberToTwoDigitString(today.getMinutes())}:${ConvertNumberToTwoDigitString(today.getSeconds())}`;
const dateTime = `${date}T${time}${timezone_standard}`;

module.exports = { dateTime };
