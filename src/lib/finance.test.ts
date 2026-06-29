import { calculateFinancialSummary, formatCurrencyAmount } from "./finance";

describe("Finance module test suite", () => {
  it("should calculate income, payments and final balance", () => {
    const summary = calculateFinancialSummary([
      { type: "income", amount: 1000 },
      { type: "expense", amount: 250.5 },
      { type: "income", amount: "99.50" },
      { type: "expense", amount: { toString: () => "10.25" } }
    ]);

    expect(summary).toEqual({
      totalIncome: 1099.5,
      totalPayments: 260.75,
      balanceFinal: 838.75
    });
  });

  it("should return zero totals when there are no records", () => {
    expect(calculateFinancialSummary([])).toEqual({
      totalIncome: 0,
      totalPayments: 0,
      balanceFinal: 0
    });
  });

  it("should format amounts in euros", () => {
    expect(formatCurrencyAmount(1234.5)).toContain("1.234,50 €");
  });
});
