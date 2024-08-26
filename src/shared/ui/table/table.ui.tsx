export type CellConfig<T = any> = {
  value: string;
  align: 'left' | 'right' | 'center';
  originalData?: T;
};

export type TableProps<T = any> = {
  headings?: CellConfig[];
  rows?: Array<CellConfig<T>[]>;
  renderCell?: (
    cellData: CellConfig<T>,
    rowIndex: number,
    cellIndex: number
  ) => React.ReactNode;
};

const alignToCss = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

export function Table<T>({ headings, rows, renderCell }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headings?.map((heading) => (
              <th key={heading.value} className={alignToCss[heading.align]}>
                {heading.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={alignToCss[cell.align]}>
                  {renderCell
                    ? renderCell(cell, rowIndex, cellIndex)
                    : cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
