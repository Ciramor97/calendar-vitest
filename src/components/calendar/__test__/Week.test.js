import { describe, test, expect } from "vitest";
import { Week, LocalDate } from "..";

describe("class week", () => {
  test("capturing week range from a date", () => {
    const day = LocalDate.fromYmd(2023, 6, 7);
    const week = Week.fromLocalDate(day);
    expect(week.dayAt(0)).toStrictEqual(LocalDate.fromYmd(2023, 6, 4));
    expect(week.dayAt(6)).toStrictEqual(LocalDate.fromYmd(2023, 6, 10));
  });
  test("prev next week", () => {
    const day = LocalDate.fromYmd(2023, 6, 7);
    const week = Week.fromLocalDate(day);
    const prevWeek = week.prev();
    expect(prevWeek.dayAt(0)).toStrictEqual(LocalDate.fromYmd(2023, 5, 28));

    const nextWeek = week.next();
    expect(nextWeek.dayAt(0)).toStrictEqual(LocalDate.fromYmd(2023, 6, 11));
  });
});
