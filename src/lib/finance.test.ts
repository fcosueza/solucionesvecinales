import { calculateFinancialSummary, formatCurrencyAmount } from "./finance";

describe("Suite de pruebas del modulo finance", () => {
  it("Debe calcular ingresos, pagos y balance final", () => {
    const summary = calculateFinancialSummary([
      { tipo: "ingreso", importe: 1000 },
      { tipo: "gasto", importe: 250.5 },
      { tipo: "ingreso", importe: "99.50" },
      { tipo: "gasto", importe: { toString: () => "10.25" } }
    ]);

    expect(summary).toEqual({
      totalIngresos: 1099.5,
      totalPagos: 260.75,
      balanceFinal: 838.75
    });
  });

  it("Debe devolver totales a cero si no hay registros", () => {
    expect(calculateFinancialSummary([])).toEqual({
      totalIngresos: 0,
      totalPagos: 0,
      balanceFinal: 0
    });
  });

  it("Debe formatear importes en euros", () => {
    expect(formatCurrencyAmount(1234.5)).toContain("1.234,50 €");
  });
});
