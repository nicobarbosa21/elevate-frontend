type Spell = {
  spell: string;
  use: string;
  index: number;
}

type Props = {
    spells: Spell[];
    isLoading: boolean;
};

export function SpellsTable({ spells, isLoading }: Props) {
    if (isLoading) return <div className="app-muted">Loading...</div>;
    return (
        <div className="app-table-wrap">
        <table className="app-table text-sm">
            <thead>
            <tr>
                <th>Spell</th>
                <th>Use</th>
            </tr>
            </thead>
            <tbody>
            {spells.map((s) => (
                <tr key={s.index}>
                <td>{s.spell}</td>
                <td>{s.use}</td>
                </tr>
            ))}
            {spells.length === 0 && (
                <tr>
                <td colSpan={2} className="text-center app-muted">
                    No result
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    );
}
