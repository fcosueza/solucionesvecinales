import { formatHourLabel, formatReservationDateLabel, formatTimeLabel } from "./dateFormatting";

describe("Date formatting helpers", () => {
  it("formats UTC time with leading zeros", () => {
    const date = new Date(Date.UTC(2026, 4, 9, 7, 5, 0));

    expect(formatTimeLabel(date)).toBe("07:05");
  });

  it("formats an hour label in HH:00 format", () => {
    expect(formatHourLabel(0)).toBe("00:00");
    expect(formatHourLabel(21)).toBe("21:00");
  });

  it("formats reservation label from a date string", () => {
    const label = formatReservationDateLabel("2026-05-09");

    expect(label).toContain("09/05");
  });

  it("formats reservation label from a Date object", () => {
    const sameDateAsString = formatReservationDateLabel("2026-05-09");
    const fromDateObject = formatReservationDateLabel(new Date(Date.UTC(2026, 4, 9, 0, 0, 0)));

    expect(fromDateObject).toBe(sameDateAsString);
  });
});
