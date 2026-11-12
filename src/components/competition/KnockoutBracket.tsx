import type { BracketMatch } from "@/shared/types/domain";

export function KnockoutBracket({ matches }: { matches: BracketMatch[] }) {
  const rounds = [...new Set(matches.map((m) => m.round))];
  return (
    <div className="flex gap-6 overflow-x-auto pb-2">
      {rounds.map((round) => (
        <div key={round} className="flex min-w-56 flex-col justify-around gap-4">
          <p className="eyebrow text-muted-foreground">{round}</p>
          {matches
            .filter((m) => m.round === round)
            .map((m) => (
              <div key={m.id} className="overflow-hidden rounded-md border bg-card">
                {[m.homeTeam, m.awayTeam].map((team, i) => (
                  <div key={team} className={`flex items-center justify-between px-3 py-2 text-sm ${i === 0 ? "border-b" : ""}`}>
                    <span className="truncate text-foreground">{team}</span>
                    <span className="font-tabular text-muted-foreground">{(i === 0 ? m.homeScore : m.awayScore) ?? "–"}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
