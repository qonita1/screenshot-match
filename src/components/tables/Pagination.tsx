import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <p className="text-muted-foreground">
        {from}–{to} dari <span className="font-semibold text-foreground">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Halaman sebelumnya">
          <ChevronLeft />
        </Button>
        <span className="px-2 font-tabular text-muted-foreground">{page}/{pages}</span>
        <Button variant="outline" size="icon" disabled={page >= pages} onClick={() => onPageChange(page + 1)} aria-label="Halaman berikutnya">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
