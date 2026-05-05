import {
  buildAllowedReservationDates,
  buildReservedHours,
  getAvailableStartHours,
  isAllowedReservationDate,
  isReservationSlotInPast,
  parseReservationDate
} from "./reservations";
import { formatHourLabel, formatReservationDateLabel, formatTimeLabel } from "./dateFormatting";

describe("Reservation helpers", () => {
  it("builds the next 7 allowed reservation dates starting tomorrow", () => {
    const dates = buildAllowedReservationDates(new Date(Date.UTC(2026, 4, 3, 12, 0, 0)));

    expect(dates).toHaveLength(7);
    expect(dates[0]).toBe("2026-05-04");
    expect(dates[6]).toBe("2026-05-10");
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
    expect(formatTimeLabel(new Date(Date.UTC(1970, 0, 1, 9, 0, 0, 0)))).toBe("09:00");
    expect(formatHourLabel(21)).toBe("21:00");
  });

  it("parses reservation date values", () => {
    const parsedDate = parseReservationDate("2026-05-09");

    expect(parsedDate).toBe("2026-05-09");
  });

  it("returns null when reservation date format is invalid", () => {
    expect(parseReservationDate("09-05-2026")).toBeNull();
  });

  it("returns null when reservation date value is calendar-invalid", () => {
    expect(parseReservationDate("2026-02-31")).toBeNull();
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

    expect(isAllowedReservationDate("2026-05-04", baseDate)).toBe(true);
    expect(isAllowedReservationDate("2026-05-12", baseDate)).toBe(false);
  });

  it("detects when a reservation slot is already in the past", () => {
    const now = new Date(Date.UTC(2026, 4, 4, 11, 30, 0));

    expect(isReservationSlotInPast("2026-05-04", 11, now)).toBe(true);
    expect(isReservationSlotInPast("2026-05-04", 12, now)).toBe(false);
    expect(isReservationSlotInPast("2026-05-05", 10, now)).toBe(false);
  });

  it("formats reservation labels from date strings", () => {
    expect(formatReservationDateLabel("2026-05-09")).toMatch(/\d{2}\/\d{2}/);
  });
});
