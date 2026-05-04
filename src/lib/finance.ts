export type RegistroTipo = "ingreso" | "gasto";

export interface RegistroCalculable {
  tipo: RegistroTipo;
  importe: number | string | { toString(): string };
}

interface FinancialSummary {
  totalIngresos: number;
  totalPagos: number;
  balanceFinal: number;
}

/**
 * Convierte un importe en cualquier formato a un número.
 * Acepta números, strings y objetos con método toString.
 *
 * @param importe El importe a convertir (número, string u objeto con toString)
 * @returns El importe convertido a número
 */
const toAmountNumber = (importe: RegistroCalculable["importe"]): number => {
  if (typeof importe === "number") {
    return importe;
  }

  return Number(importe.toString());
};

/**
 * Calcula el resumen financiero (ingresos, gastos y saldo) de una lista de registros.
 * Suma todos los ingresos, gastos y calcula el balance final.
 *
 * @param registros Array de registros financieros a procesar
 * @returns Objeto con totalIngresos, totalPagos y balanceFinal
 */
const calculateFinancialSummary = (registros: RegistroCalculable[]): FinancialSummary => {
  return registros.reduce<FinancialSummary>(
    (summary, registro) => {
      const amount = toAmountNumber(registro.importe);

      if (registro.tipo === "ingreso") {
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
 * Formatea un cantidad numérica como moneda en euros con separadores de miles.
 * Ejemplo: 1234.56 -> "1.234,56 €"
 *
 * @param amount La cantidad a formatear
 * @returns String con el formato de moneda (euros)
 */
const formatCurrencyAmount = (amount: number): string => {
  const fixed = amount.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${intFormatted},${decPart} €`;
};

export { calculateFinancialSummary, formatCurrencyAmount };
