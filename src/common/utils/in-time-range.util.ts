export function isWithinTimeRange(params: {
  startHour: number;
  startMinutes: number;
  endHour: number;
  endMinutes: number;
  hour: number;
  minutes: number;
}): boolean {
  const { endHour, endMinutes, hour, minutes, startHour, startMinutes } =
    params;

  return (
    (startHour === hour && startMinutes === minutes) ||
    (endHour === hour && endMinutes > minutes) ||
    (startHour === hour && startMinutes <= minutes && endHour > hour) ||
    (startHour < hour && endHour > hour)
  );
}
