export type CellConfig = {
  value: string;
  align: 'left' | 'right' | 'center';
};

export type TableProps = {
  headings?: CellConfig[];
  rows?: Array<CellConfig[]>;
  renderCell?: (value: string, index: number) => JSX.Element;
};

const alignToCss = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

export const Table = ({ headings, rows, renderCell }: TableProps) => {
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
          {rows?.map((cell, colIndex) => (
            <tr key={colIndex}>
              {cell.map((cell, cellIndex: number) => (
                <td key={cellIndex} className={alignToCss[cell.align]}>
                  {renderCell ? renderCell(cell.value, cellIndex) : cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
