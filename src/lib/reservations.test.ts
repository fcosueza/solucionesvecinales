import {
  buildAllowedReservationDates,
  buildReservedHours,
  createTimeDate,
  formatTimeLabel,
  getAvailableStartHours,
  getHourFromTime,
  parseReservationDate,
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
});
