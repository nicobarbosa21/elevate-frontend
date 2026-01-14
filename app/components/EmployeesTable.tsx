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
    if (isLoading) return <div className="app-muted">Loading...</div>;
    return (
      <div className="app-table-wrap">
        <table className="app-table text-sm">
            <thead>
            <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>DNI</th>
                <th>Job</th>
                <th>Country</th>
                <th>Seniority</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((e) => (
                <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.last_name}</td>
                <td>{e.age}</td>
                <td>{e.dni}</td>
                <td>{e.job?.title}</td>
                <td>{e.nationality?.country_name}</td>
                <td>{e.seniority?.level}</td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      className="app-btn app-btn-soft px-3 py-1 cursor-pointer"
                      onClick={() => onEdit?.(e)}
                    >
                      Edit
                    </button>
                    <button 
                      className="app-btn app-btn-danger px-3 py-1 cursor-pointer"
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
                <td colSpan={7} className="text-center app-muted">
                    No result
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    );
}
