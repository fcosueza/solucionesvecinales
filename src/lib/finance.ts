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

const toAmountNumber = (importe: RegistroCalculable["importe"]): number => {
  if (typeof importe === "number") {
    return importe;
  }

  return Number(importe.toString());
};

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

const formatCurrencyAmount = (amount: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
};

export { calculateFinancialSummary, formatCurrencyAmount };
