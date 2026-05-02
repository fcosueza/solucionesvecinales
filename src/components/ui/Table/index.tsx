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

const Table = ({ headers, rows, emptyMessage = "No data available.", className = "" }: Props): React.ReactNode => {
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
