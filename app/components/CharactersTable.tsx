type Character = {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  children: string[];
  image: string;
  birthdate: string;
  index: number;
}

type Props = {
    characters: Character[];
    isLoading: boolean;
};

export function CharactersTable({ characters, isLoading }: Props) {
    if (isLoading) return <div className="text-black">Loading...</div>;
    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm text-black">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-3 text-black">Full Name</th>
                <th className="px-4 py-3 text-black">Nickname</th>
                <th className="px-4 py-3 text-black">House</th>
                <th className="px-4 py-3 text-black">Interpreted By</th>
                <th className="px-4 py-3 text-black">Children</th>
                <th className="px-4 py-3 text-black">Birthday</th>
            </tr>
            </thead>
            <tbody>
            {characters.map((c) => (
                <tr key={c.index} className="border-t">
                <td className="px-4 py-3 text-black">{c.fullName}</td>
                <td className="px-4 py-3 text-black">{c.nickname}</td>
                <td className="px-4 py-3 text-black">{c.hogwartsHouse}</td>
                <td className="px-4 py-3 text-black">{c.interpretedBy || 'N/A'}</td>
                <td className="px-4 py-3 text-black">{c.children.join(', ') || 'N/A'}</td>
                <td className="px-4 py-3 text-black">{c.birthdate}</td>
                </tr>
            ))}
            {characters.length === 0 && (
                <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                    No result
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    );
}
