export type FinancialRecordType = "income" | "expense";

export interface FinancialRecordCalculable {
  type: FinancialRecordType;
  amount: number | string | { toString(): string };
  description?: string;
}

interface FinancialSummary {
  totalIncome: number;
  totalPayments: number;
  balanceFinal: number;
}

/**
 * Converts an amount in any format to a number.
 * Accepts numbers, strings and objects with toString method.
 *
 * @param amount The amount to convert (number, string or object with toString)
 * @returns The amount converted to number
 */
const toAmountNumber = (amount: number | string | { toString(): string }): number => {
  if (typeof amount === "number") {
    return amount;
  }

  return Number(amount.toString());
};

/**
 * Calculates the financial summary (income, expenses, and balance) of a list of records.
 * Sums all incomes, expenses, and calculates the final balance.
 *
 * @param records Array of financial records to process
 * @returns Object with totalIncome, totalPayments and balanceFinal
 */
const calculateFinancialSummary = (records: FinancialRecordCalculable[]): FinancialSummary => {
  return records.reduce<FinancialSummary>(
    (summary, record) => {
      const amount = toAmountNumber(record.amount);
      const isIncome = record.type === "income";

      if (isIncome) {
        summary.totalIncome += amount;
      } else {
        summary.totalPayments += amount;
      }

      summary.balanceFinal = summary.totalIncome - summary.totalPayments;

      return summary;
    },
    {
      totalIncome: 0,
      totalPayments: 0,
      balanceFinal: 0
    }
  );
};

/**
 * Formats a numerical quantity as euro currency with thousands separators.
 * Example: 1234.56 -> "1.234,56 €"
 *
 * @param amount The amount to format
 * @returns String with currency format (euros)
 */
const formatCurrencyAmount = (amount: number): string => {
  const fixed = amount.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${intFormatted},${decPart} €`;
};

export { calculateFinancialSummary, formatCurrencyAmount };
