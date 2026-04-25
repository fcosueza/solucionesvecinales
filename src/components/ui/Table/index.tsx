import style from "./style.module.css";

export interface TableRow {
  key?: React.Key;
  cells: React.ReactNode[];
}

interface Props {
  headers: string[];
  rows: TableRow[];
  emptyMessage?: string;
  className?: string;
}

const Table = ({ headers, rows, emptyMessage = "No data available.", className = "" }: Props): React.ReactNode => {
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
              <tr key={row.key ?? rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
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