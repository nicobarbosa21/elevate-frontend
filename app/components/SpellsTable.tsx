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
    if (isLoading) return <div className="text-black">Loading...</div>;
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm text-black">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-3 text-black">Spell</th>
                <th className="px-4 py-3 text-black">Use</th>
            </tr>
            </thead>
            <tbody>
            {spells.map((s) => (
                <tr key={s.index} className="border-t">
                <td className="px-4 py-3 text-black">{s.spell}</td>
                <td className="px-4 py-3 text-black">{s.use}</td>
                </tr>
            ))}
            {spells.length === 0 && (
                <tr>
                <td colSpan={2} className="px-4 py-3 text-center text-gray-500">
                    No result
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    );
}
