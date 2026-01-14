type Book = {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
};

type Props = {
  books: Book[];
  isLoading: boolean;
};

export function BooksTable({ books, isLoading }: Props) {
  if (isLoading) return <div className="app-muted">Loading...</div>;

  return (
    <div className="app-table-wrap">
      <table className="app-table text-sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Original title</th>
            <th>Release date</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.index}>
              <td>{b.title}</td>
              <td>{b.originalTitle}</td>
              <td>{b.releaseDate}</td>
              <td>{b.pages}</td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center app-muted">
                No result
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
