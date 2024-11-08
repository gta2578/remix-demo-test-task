export function formatDate(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return parsedDate.toLocaleString('en-US', options);
}