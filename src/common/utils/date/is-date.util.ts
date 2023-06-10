export function isDate(value: string): boolean {
  try {
    const dateISO = new Date(value).toISOString();
    const [date] = dateISO.split('T');

    return /^[1-9]\d*-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date);
  } catch (error) {}

  return false;
}
