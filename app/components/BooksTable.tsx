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
  if (isLoading) return <div className="text-black">Loading...</div>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-left text-sm text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-black">Title</th>
            <th className="px-4 py-3 text-black">Original title</th>
            <th className="px-4 py-3 text-black">Release date</th>
            <th className="px-4 py-3 text-black">Pages</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.index} className="border-t">
              <td className="px-4 py-3 text-black">{b.title}</td>
              <td className="px-4 py-3 text-black">{b.originalTitle}</td>
              <td className="px-4 py-3 text-black">{b.releaseDate}</td>
              <td className="px-4 py-3 text-black">{b.pages}</td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                No result
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
