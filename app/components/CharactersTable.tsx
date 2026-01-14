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
    if (isLoading) return <div className="app-muted">Loading...</div>;
    return (
      <div className="app-table-wrap">
        <table className="app-table text-sm">
            <thead>
            <tr>
                <th>Full Name</th>
                <th>Nickname</th>
                <th>House</th>
                <th>Interpreted By</th>
                <th>Children</th>
                <th>Birthday</th>
            </tr>
            </thead>
            <tbody>
            {characters.map((c) => (
                <tr key={c.index}>
                <td>{c.fullName}</td>
                <td>{c.nickname}</td>
                <td>{c.hogwartsHouse}</td>
                <td>{c.interpretedBy || 'N/A'}</td>
                <td>{c.children.join(', ') || 'N/A'}</td>
                <td>{c.birthdate}</td>
                </tr>
            ))}
            {characters.length === 0 && (
                <tr>
                <td colSpan={6} className="text-center app-muted">
                    No result
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    );
}
