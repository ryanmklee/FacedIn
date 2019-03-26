// Formats date string to be used in the application
// ex) "Tue, 26 Mar 2019 03:20:20 GMT" to "2019-03-26 at 03:20"
export default function formatDateString(dateString) {
  const dateObj = new Date(dateString);
  if (!dateObj) {
    return '';
  }
  const hourInt = dateObj.getHours();
  const minuteInt = dateObj.getMinutes();
  const hour = hourInt < 10 ? '0' + hourInt : hourInt;
  const minute = minuteInt < 10 ? '0' + minuteInt : minuteInt;
  return dateObj.toISOString().slice(0,10) + ' at ' + hour + ':' + minute; 
}