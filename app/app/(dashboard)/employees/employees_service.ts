import { apiFetch } from '@/lib/api';

const API = process.env.NEXT_PUBLIC_API_URL ?? '';

function toQuery(params: Record<string, any>) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      usp.append(key, String(value));
    }
  });
  return usp.toString();
}

export async function fetchAllEmployees() {
  const response = await apiFetch(`${API}employees`);
  return response.json();
}

export async function fetchEmployeesByName(name: string) {
  const response = await apiFetch(`${API}employees/name/${name}`);
  return response.json();
}

export async function fetchEmployeesByLastName(lastName: string) {
  const response = await apiFetch(`${API}employees/last_name/${lastName}`);
  return response.json();
}

export async function fetchJobs() {
  const response = await apiFetch(`${API}jobs`);
  return response.json();
}

export async function fetchNationalities() {
  const response = await apiFetch(`${API}nationalities`);
  return response.json();
}

export async function fetchSeniorities() {
  const response = await apiFetch(`${API}seniorities`);
  return response.json();
}

export async function createEmployee(payload: any) {
  const qs = toQuery(payload);
  const res = await apiFetch(`${API}employees?${qs}`, { method: 'POST' });
  if (!res.ok) throw new Error('Error creating employee');
  return res.json();
}

export async function updateEmployee(employeeId: number, payload: any) {
  const qs = toQuery(payload);
  const res = await apiFetch(`${API}employees/${employeeId}?${qs}`, { method: 'PUT' });
  if (!res.ok) throw new Error('Error updating employee');
  return res.json();
}

export async function deleteEmployee(employeeId: number) {
  const res = await apiFetch(`${API}employees/${employeeId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting employee');
  return res.json();
}
