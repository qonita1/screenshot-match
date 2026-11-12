import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Standing } from "@/shared/types/domain";

export function StandingsTable({ rows, highlightTeam }: { rows: Standing[]; highlightTeam?: string }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">#</TableHead>
            <TableHead>Tim</TableHead>
            {["M", "S", "K", "SG"].map((h) => (
              <TableHead key={h} className="text-center">{h === "M" ? "Main" : h}</TableHead>
            ))}
            <TableHead className="text-center">Poin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={r.team} className={r.team === highlightTeam ? "bg-accent/60" : undefined}>
              <TableCell className="font-tabular text-muted-foreground">{i + 1}</TableCell>
              <TableCell className="whitespace-nowrap font-medium">{r.team}</TableCell>
              <TableCell className="text-center font-tabular">{r.played}</TableCell>
              <TableCell className="text-center font-tabular">{r.drawn}</TableCell>
              <TableCell className="text-center font-tabular">{r.lost}</TableCell>
              <TableCell className="text-center font-tabular">{r.goalsFor - r.goalsAgainst > 0 ? "+" : ""}{r.goalsFor - r.goalsAgainst}</TableCell>
              <TableCell className="text-center font-tabular font-bold">{r.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
