export default function parseDate(datetime) {
  const date = new Date(datetime);
  const dateFormat = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(date);

  return dateFormat;
}
