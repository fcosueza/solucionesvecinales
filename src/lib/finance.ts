export type FinancialRecordType = "income" | "expense";

export interface FinancialRecordCalculable {
  type: FinancialRecordType;
  amount: number | string | { toString(): string };
  description?: string;
}

interface FinancialSummary {
  totalIngresos: number;
  totalPagos: number;
  balanceFinal: number;
}

/**
 * Converts an amount in any format to a number.
 * Accepts numbers, strings and objects with toString method.
 *
 * @param amount The amount to convert (number, string or object with toString)
 * @returns El amount converted to number
 */
const toAmountNumber = (amount: number | string | { toString(): string }): number => {
  if (typeof amount === "number") {
    return amount;
  }

  return Number(amount.toString());
};

/**
 * Calcula el resumen financiero (ingresos, gastos y saldo) de una lista de registros.
 * Suma todos los ingresos, gastos y calcula el balance final.
 *
 * @param records Array de registros financieros a procesar
 * @returns Objeto with totalIncome, totalPayments and balanceFinal
 */
const calculateFinancialSummary = (records: FinancialRecordCalculable[]): FinancialSummary => {
  return records.reduce<FinancialSummary>(
    (summary, record) => {
      const amount = toAmountNumber(record.amount);
      const isIncome = record.type === "income";

      if (isIncome) {
        summary.totalIngresos += amount;
      } else {
        summary.totalPagos += amount;
      }

      summary.balanceFinal = summary.totalIngresos - summary.totalPagos;

      return summary;
    },
    {
      totalIngresos: 0,
      totalPagos: 0,
      balanceFinal: 0
    }
  );
};

/**
 * Formats a numerical quantity as euro currency with thousands separators.
 * Ejemplo: 1234.56 -> "1.234,56 €"
 *
 * @param amount La cantidad a formatear
 * @returns String with currency format (euros)
 */
const formatCurrencyAmount = (amount: number): string => {
  const fixed = amount.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${intFormatted},${decPart} €`;
};

export { calculateFinancialSummary, formatCurrencyAmount };
