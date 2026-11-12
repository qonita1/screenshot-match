import type { ReactNode } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  /** Card rendering for small screens. Without it, the table scrolls horizontally. */
  mobileCard?: (row: T) => ReactNode;
  empty?: ReactNode;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ rows, columns, rowKey, mobileCard, empty, onRowClick }: DataTableProps<T>) {
  if (rows.length === 0 && empty) return <>{empty}</>;
  return (
    <>
      {mobileCard && (
        <ul className="divide-y rounded-lg border bg-card md:hidden">
          {rows.map((row) => (
            <li key={rowKey(row)} className="p-3">
              {mobileCard(row)}
            </li>
          ))}
        </ul>
      )}
      <div className={cn("overflow-x-auto rounded-lg border bg-card", mobileCard && "hidden md:block")}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key} className={c.className}>{c.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? "cursor-pointer" : undefined}
              >
                {columns.map((c) => (
                  <TableCell key={c.key} className={c.className}>{c.cell(row)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
