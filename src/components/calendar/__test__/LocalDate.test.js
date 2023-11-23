import { describe, test, expect } from "vitest";
import { LocalDate } from "..";

describe("class LocalDate", () => {
  test("format date", () => {
    const day = LocalDate.fromYmd(2023, 6, 9);
    expect(day.year).toBe("2023");
    expect(day.month).toBe("06");
    expect(day.date).toBe("09");
    expect(day.ymdText).toBe("2023-06-09");
  });

  test("week offset of a date", () => {
    const day = LocalDate.fromYmd(2023, 6, 9);
    expect(day.weekOffset).toBe(5);
  });

  test("minus", () => {
    const fri = LocalDate.fromYmd(2023, 6, 9);
    const thu = fri.minus(1, "day");
    expect(thu.date).toBe("08");
    expect(thu).toStrictEqual(LocalDate.fromYmd(2023, 6, 8));
    expect(fri.minus(7, "day")).toStrictEqual(LocalDate.fromYmd(2023, 6, 2));
  });

  test("plus", () => {
    const fri = LocalDate.fromYmd(2023, 6, 9);
    expect(fri.plus(7, "day")).toStrictEqual(LocalDate.fromYmd(2023, 6, 16));
  });
});
