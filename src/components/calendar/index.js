const MILLIS = {
  day: 1 * 24 * 60 * 60 * 1000,
  week: 7 * 1 * 24 * 60 * 60 * 1000,
};
const pad = (num, length) => {
  return ("0000" + num).slice(-length);
};

const shiftDate = (date, delta, unit) => {
  const millis = delta * MILLIS[unit];
  const currMillis = date.value.getTime();
  return new LocalDate(new Date(currMillis + millis));
};

export class LocalDate {
  value;
  constructor(value) {
    this.value = value;
  }
  get year() {
    return pad(this.value.getFullYear(), 4);
  }
  get month() {
    return pad(this.value.getMonth() + 1, 2);
  }
  get date() {
    return pad(this.value.getDate(), 2);
  }
  get ymdText() {
    const { year, month, date } = this;
    return `${year}-${month}-${date}`;
  }
  get weekOffset() {
    return this.value.getDay();
  }
  minus(delta, unit) {
    return shiftDate(this, -1 * delta, unit);
  }
  plus(delta, unit) {
    return shiftDate(this, delta, unit);
  }
  equals(other) {
    return (
      other &&
      other.year === this.year &&
      other.month === this.month &&
      other.date === this.date
    );
  }
}

LocalDate.fromYmd = (year, month, date) => {
  const value = new Date(year, month - 1, date);
  return new LocalDate(value);
};

export class Week {
  day;
  constructor(leadingDate) {
    this.date = leadingDate;
  }

  dayAt(weekOffset) {
    return this.date.plus(weekOffset, "day");
  }
  days() {
    const sevenDays = [];
    for (let offset = 0; offset < 7; offset++) {
      const day = this.date.plus(offset, "day");
      sevenDays.push(day);
    }
    return sevenDays;
  }
  prev() {
    const leadingDate = this.date.minus(7, "day");
    return new Week(leadingDate);
  }
  next() {
    const leadingDate = this.date.plus(7, "day");
    return new Week(leadingDate);
  }
}
Week.fromLocalDate = (date) => {
  const offfset = date.weekOffset;
  const sunday = date.minus(offfset, "day");
  return new Week(sunday);
};

export class Calendar {
  weeks;
  constructor(weeks) {
    this.weeks = weeks;
  }
  get firstWeek() {
    return this.weeks[0];
  }
  get lastWeek() {
    return this.weeks[this.weeks.length - 1];
  }
  get yearText() {
    return this.firstWeek.dayAt(0).year;
  }
  get monthText() {
    return this.firstWeek.dayAt(6).month;
  }
  getWeeks() {
    return this.weeks;
  }
  prevMonth() {
    const anyDay = this.firstWeek.prev().dayAt(0);
    const year = Number.parseInt(anyDay.year);
    const month = Number.parseInt(anyDay.month);

    return Calendar.fromYm(year, month);
  }

  nextMonth() {
    const anyDay = this.lastWeek.next().dayAt(0);
    const year = Number.parseInt(anyDay.year);
    const month = Number.parseInt(anyDay.month);

    return Calendar.fromYm(year, month);
  }
  containsDate(date) {
    return this.monthText === date.month;
  }
  isToday(date) {
    const now = new LocalDate(new Date());
    return now.equals(date);
  }
}
Calendar.fromYm = (year, month) => {
  const leadingDate = LocalDate.fromYmd(year, month, 1);
  const leadingWeek = Week.fromLocalDate(leadingDate);
  const weeks = [];
  let ref = leadingWeek;

  while (weeks.length < 6) {
    weeks.push(ref);
    ref = ref.next();
  }
  return new Calendar(weeks);
};
