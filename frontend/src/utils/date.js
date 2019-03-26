// Formats date string to be used in the application
// ex) "Tue, 26 Mar 2019 03:20:20 GMT" to "2019-03-26 at 03:20"
export default function formatDateString(dateString) {
  const dateObj = new Date(dateString);
  if (!dateObj) {
    return '';
  }
  return dateObj.toISOString().slice(0,10) + ' at ' 
  + dateObj.getHours() + ':' + dateObj.getMinutes(); 
}