import style from "./style.module.css";

export interface TableCell {
  content: React.ReactNode;
  colSpan?: number;
  className?: string;
}

export interface TableRow {
  key?: React.Key;
  cells: Array<React.ReactNode | TableCell>;
  variant?: "default" | "section" | "summary" | "balance";
  className?: string;
}

interface Props {
  headers: string[];
  rows: TableRow[];
  emptyMessage?: string;
  className?: string;
}

/**
 * Componente de tabla reutilizable que muestra datos en filas y columnas.
 * Soporta variantes de fila (default, section, summary, balance) y
 * muestra un mensaje cuando no hay datos disponibles.
 *
 * @param headers Lista de encabezados de columna
 * @param rows Lista de filas con celdas y variante opcional
 * @param emptyMessage Mensaje a mostrar cuando no hay filas (por defecto "No data available.")
 * @param className Clase CSS adicional para el contenedor de la tabla
 */
const Table = ({ headers, rows, emptyMessage = "No data available.", className = "" }: Props): React.ReactNode => {
  /**
   * Normaliza una celda al tipo TableCell para garantizar acceso uniforme a sus propiedades.
   *
   * @param cell La celda a normalizar (puede ser ReactNode o TableCell)
   * @returns Objeto TableCell normalizado
   */
  const getCellData = (cell: React.ReactNode | TableCell): TableCell => {
    if (typeof cell === "object" && cell !== null && "content" in cell) {
      return cell;
    }

    return { content: cell };
  };

  return (
    <div className={`${style.wrapper} ${className}`.trim()}>
      <table className={style.table}>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr
                key={row.key ?? rowIndex}
                className={[
                  row.variant === "section" ? style.sectionRow : "",
                  row.variant === "summary" ? style.summaryRow : "",
                  row.variant === "balance" ? style.balanceRow : "",
                  row.className ?? ""
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {row.cells.map((cell, cellIndex) => {
                  const cellData = getCellData(cell);

                  return (
                    <td key={cellIndex} colSpan={cellData.colSpan} className={cellData.className}>
                      {cellData.content}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className={style.emptyState}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
