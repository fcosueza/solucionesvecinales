import {
  buildAllowedReservationDates,
  buildReservedHours,
  createTimeDate,
  formatReservationDateLabel,
  formatTimeLabel,
  getAvailableStartHours,
  getHourFromTime,
  getHourlyRange,
  isAllowedReservationDate,
  isWholeHourTime,
  parseReservationDate,
  startOfUTCDate,
  toReservationDateValue
} from "./reservations";

describe("Reservation helpers", () => {
  it("builds the next 7 allowed reservation dates starting tomorrow", () => {
    const dates = buildAllowedReservationDates(new Date(Date.UTC(2026, 4, 3, 12, 0, 0)));

    expect(dates).toHaveLength(7);
    expect(toReservationDateValue(dates[0])).toBe("2026-05-04");
    expect(toReservationDateValue(dates[6])).toBe("2026-05-10");
  });

  it("returns the reserved hourly slots for a reservation", () => {
    expect(buildReservedHours(10, 2)).toEqual([10, 11]);
  });

  it("filters available start hours against occupied slots and duration", () => {
    expect(
      getAvailableStartHours({
        openingHour: 9,
        closingHour: 14,
        duration: 2,
        occupiedHours: [10, 11]
      })
    ).toEqual([12]);
  });

  it("formats times using UTC-safe hours", () => {
    expect(formatTimeLabel(createTimeDate(9, 0))).toBe("09:00");
    expect(getHourFromTime(createTimeDate(21, 0))).toBe(21);
  });

  it("parses reservation date values into UTC dates", () => {
    const parsedDate = parseReservationDate("2026-05-09");

    expect(parsedDate).not.toBeNull();
    expect(toReservationDateValue(parsedDate!)).toBe("2026-05-09");
  });

  it("returns null when reservation date format is invalid", () => {
    expect(parseReservationDate("09-05-2026")).toBeNull();
  });

  it("returns null when Date.UTC produces an invalid timestamp", () => {
    const utcSpy = jest.spyOn(Date, "UTC").mockReturnValueOnce(Number.NaN);

    expect(parseReservationDate("2026-05-09")).toBeNull();

    utcSpy.mockRestore();
  });

  it("builds hourly range and supports empty range", () => {
    expect(getHourlyRange(9, 12)).toEqual([9, 10, 11]);
    expect(getHourlyRange(12, 12)).toEqual([]);
  });

  it("returns empty available hours for invalid duration", () => {
    expect(
      getAvailableStartHours({
        openingHour: 9,
        closingHour: 14,
        duration: 0,
        occupiedHours: []
      })
    ).toEqual([]);

    expect(
      getAvailableStartHours({
        openingHour: 9,
        closingHour: 14,
        duration: 3,
        occupiedHours: []
      })
    ).toEqual([]);
  });

  it("validates reservation date inside and outside allowed window", () => {
    const baseDate = new Date(Date.UTC(2026, 4, 3, 12, 0, 0));

    expect(isAllowedReservationDate(new Date(Date.UTC(2026, 4, 4)), baseDate)).toBe(true);
    expect(isAllowedReservationDate(new Date(Date.UTC(2026, 4, 12)), baseDate)).toBe(false);
  });

  it("detects whole-hour times", () => {
    expect(isWholeHourTime(createTimeDate(10, 0))).toBe(true);
    expect(isWholeHourTime(createTimeDate(10, 30))).toBe(false);
  });

  it("normalizes to start of UTC date and formats reservation label", () => {
    const normalizedDate = startOfUTCDate(new Date(Date.UTC(2026, 4, 3, 18, 45, 22)));

    expect(toReservationDateValue(normalizedDate)).toBe("2026-05-03");
    expect(formatReservationDateLabel(new Date(Date.UTC(2026, 4, 9)))).toMatch(/\d{2}\/\d{2}/);
  });
});
