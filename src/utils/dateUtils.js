export const EXTENDED_MONTHS = [
  { id: 'oct', label: 'October', short: 'Oct', year: 2026, month: 9 },
  { id: 'nov', label: 'November', short: 'Nov', year: 2026, month: 10 },
  { id: 'dec', label: 'December', short: 'Dec', year: 2026, month: 11 },
  { id: 'jan', label: 'January', short: 'Jan', year: 2027, month: 0 },
  { id: 'feb', label: 'February', short: 'Feb', year: 2027, month: 1 },
  { id: 'mar', label: 'March', short: 'Mar', year: 2027, month: 2 },
  { id: 'apr', label: 'April', short: 'Apr', year: 2027, month: 3 }
];

export const getMondayOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7; // 0 for Mon, 1 for Tue ... 6 for Sun
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getWeekDaysForDate = (date) => {
  const monday = getMondayOfWeek(date);
  const dayIds = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayFulls = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      id: dayIds[i],
      label: dayLabels[i],
      full: dayFulls[i],
      dateNum: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      dateObj: d,
      dateKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    };
  });
};

export const formatWeekRange = (mondayDate) => {
  const sunday = new Date(mondayDate);
  sunday.setDate(mondayDate.getDate() + 6);

  const startMonth = mondayDate.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = sunday.toLocaleDateString('en-US', { month: 'short' });
  const startDay = mondayDate.getDate();
  const endDay = sunday.getDate();
  const year = sunday.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
};

export const jsDayToDayId = (dayIndex) => {
  // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return map[dayIndex] || 'mon';
};
