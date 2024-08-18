import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { CellConfig, Table } from './table.ui';

const tableHeadings: CellConfig[] = [
  {
    value: 'Name',
    align: 'left',
  },
  {
    value: 'Email',
    align: 'left',
  },
  {
    value: 'Actions',
    align: 'right',
  },
];

const tableData: Array<CellConfig[]> = [
  [
    {
      value: 'John Doe',
      align: 'left',
    },
    {
      value: 'me@example.com',
      align: 'left',
    },
    {
      value: 'actions',
      align: 'right',
    },
  ],
];

describe('Table', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders table headers correctly', () => {
    render(<Table headings={tableHeadings} rows={tableData} />);
    tableHeadings.forEach((heading) => {
      expect(screen.getByText(heading.value)).toBeTruthy();
    });
  });

  it('renders table data correctly', () => {
    render(<Table headings={tableHeadings} rows={tableData} />);
    tableData.flat().forEach((cell) => {
      if (cell.value !== 'actions') {
        expect(screen.getByText(cell.value)).toBeTruthy();
      }
    });
  });

  it('applies correct alignment classes', () => {
    render(<Table headings={tableHeadings} rows={tableData} />);

    // Check headers alignment
    tableHeadings.forEach((heading) => {
      const th = screen.getByText(heading.value);
      expect(th.className).toContain(`text-${heading.align}`);
    });

    // Check data cells alignment
    tableData.flat().forEach((cell) => {
      if (cell.value !== 'actions') {
        const td = screen.getByText(cell.value);
        expect(td.className).toContain(`text-${cell.align}`);
      }
    });
  });

  it('uses custom renderCell function when provided', () => {
    const customRenderCell = vi.fn((value) => (
      <span data-testid="custom-cell">{value.toUpperCase()}</span>
    ));
    const cellsCount = tableData[0].length;
    render(
      <Table
        headings={tableHeadings}
        rows={tableData}
        renderCell={customRenderCell}
      />
    );

    expect(customRenderCell).toHaveBeenCalled();
    expect(screen.getAllByTestId('custom-cell')).toHaveLength(cellsCount);
    expect(screen.getByText('JOHN DOE')).toBeTruthy();
  });
});
