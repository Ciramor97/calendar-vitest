import { describe, test, expect } from "vitest";
import { Calendar } from "..";

describe("class calendar", () => {
  test("init", () => {
    const month = Calendar.fromYm(2023, 6);
    expect(month.yearText).toBe("2023");
    expect(month.monthText).toBe("06");

    const weeks = month.getWeeks();
    expect(weeks.length).toBe(6);
  });

  test("prev next month", () => {
    const month01 = Calendar.fromYm(2023, 1);
    const month12 = month01.prevMonth();
    expect(month12.yearText).toBe("2022");
    expect(month12.monthText).toBe("12");

    const month02 = month01.nextMonth();
    expect(month02.yearText).toBe("2023");
    expect(month02.monthText).toBe("02");
  });
});
