type Employee = {
  id: number;
  name: string;
  last_name: string;
  age: number;
  dni: string;

  job_id: number;
  country_id: number;
  seniority_id: number;

  job?: Job;
  nationality?: Nationality;
  seniority?: Seniority;
};

type Job = {
  id: number;
  title: string;
};

type Nationality = {
  country_name: string;
};

type Seniority = {
  level: string;
};

type Props = {
    employees: Employee[];
    isLoading: boolean;
    onEdit?: (e: Employee) => void;
    onDelete?: (e: Employee) => void;
};

export function EmployeesTable({ employees, isLoading, onEdit, onDelete }: Props) {
    if (isLoading) return <div className="text-black">Loading...</div>;
    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm text-black">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-3 text-black">Name</th>
                <th className="px-4 py-3 text-black">Last Name</th>
                <th className="px-4 py-3 text-black">Age</th>
                <th className="px-4 py-3 text-black">DNI</th>
                <th className="px-4 py-3 text-black">Job</th>
                <th className="px-4 py-3 text-black">Country</th>
                <th className="px-4 py-3 text-black">Seniority</th>
                <th className="px-4 py-3 text-black">Actions</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((e) => (
                <tr key={e.id} className="border-t">
                <td className="px-4 py-3 text-black">{e.name}</td>
                <td className="px-4 py-3 text-black">{e.last_name}</td>
                <td className="px-4 py-3 text-black">{e.age}</td>
                <td className="px-4 py-3 text-black">{e.dni}</td>
                <td className="px-4 py-3 text-black">{e.job?.title}</td>
                <td className="px-4 py-3 text-black">{e.nationality?.country_name}</td>
                <td className="px-4 py-3 text-black">{e.seniority?.level}</td>
                <td className="px-4 py-3 text-black">
                  <div className="flex gap-2">
                    <button 
                      className="rounded-md border px-3 py-1 hover:bg-gray-100 transition duration-200 cursor-pointer"
                      onClick={() => onEdit?.(e)}
                    >
                      Edit
                    </button>
                    <button 
                      className="ml-2 rounded-md border px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition duration-200 cursor-pointer"
                      onClick={() => onDelete?.(e)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                </tr>
            ))}
            {employees.length === 0 && (
                <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-gray-500">
                    No result
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    );
}
