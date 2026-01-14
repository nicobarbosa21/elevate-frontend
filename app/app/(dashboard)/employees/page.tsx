'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EmployeesTable } from '@/components/EmployeesTable';
import { EmployeeForm } from '@/components/EmployeeForm';
import {
  fetchAllEmployees,
  fetchEmployeesByName,
  fetchEmployeesByLastName,
  fetchJobs,
  fetchNationalities,
  fetchSeniorities,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './employees_service';

export default function Employees() {
  const queryClient = useQueryClient();
  
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const trimmedName = name.trim();
  const trimmedLastName = lastName.trim();

  const isSearchingByName = trimmedName.length > 0;
  const isSearchingByLastName = trimmedLastName.length > 0;

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState<any>(undefined);

  const openCreate = () => {setMode('create'); setEditingId(null); setInitialValues(undefined); setModalOpen(true);};

  const openEdit = (e: any) => {
    setMode('edit');
    setEditingId(e.id);
    setInitialValues({
      name: e.name ?? '',
      last_name: e.last_name ?? '',
      age: String(e.age ?? ''),
      dni: e.dni ?? '',
      job_id: String(e.job_id ?? ''),
      country_id: String(e.country_id ?? ''),
      seniority_id: String(e.seniority_id ?? ''),
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const { data: allData, isLoading: allLoading, error: allError } = useQuery({
    queryKey: ['employees_all'],
    queryFn: fetchAllEmployees,
  });

  const { data: nameData, isLoading: nameLoading, error: nameError } = useQuery({
    queryKey: ['employees_name', trimmedName],
    enabled: isSearchingByName,
    queryFn: () => fetchEmployeesByName(trimmedName),
  });

  const { data: lastNameData, isLoading: lastNameLoading, error: lastNameError } = useQuery({
    queryKey: ['employees_lastName', trimmedLastName],
    enabled: isSearchingByLastName,
    queryFn: () => fetchEmployeesByLastName(trimmedLastName),
  });
  
  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs_all'],
    queryFn: fetchJobs,
  });

  const { data: nationalities = [], isLoading: natLoading } = useQuery({
    queryKey: ['nationalities_all'],
    queryFn: fetchNationalities,
  });

  const { data: seniorities = [], isLoading: senLoading } = useQuery({
    queryKey: ['seniorities_all'],
    queryFn: fetchSeniorities,
  });

  const catalogsLoading = jobsLoading || natLoading || senLoading;
  const isLoading = allLoading || nameLoading || lastNameLoading;

  const error =
    (isSearchingByName && nameError) ||
    (isSearchingByLastName && lastNameError) ||
    (!isSearchingByName && !isSearchingByLastName && allError);

  const data = useMemo(() => {
    const all = allData ?? [];
    const byName = nameData ?? [];
    const byLast = lastNameData ?? [];

    if (!isSearchingByName && !isSearchingByLastName) return all;
    if (isSearchingByName && !isSearchingByLastName) return byName;
    if (!isSearchingByName && isSearchingByLastName) return byLast;
    
    const lastSet = new Set(byLast.map((e: any) => e.dni));
    return byName.filter((e: any) => lastSet.has(e.dni));
  }, [allData, nameData, lastNameData, isSearchingByName, isSearchingByLastName]);

  const invalidateEmployees = () => {
    queryClient.invalidateQueries({ queryKey: ['employees_all'] });
    queryClient.invalidateQueries({ queryKey: ['employees_name'] });
    queryClient.invalidateQueries({ queryKey: ['employees_lastName'] });
  };

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {invalidateEmployees(); closeModal();},
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => updateEmployee(id, payload),
    onSuccess: () => {invalidateEmployees(); closeModal();},
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => invalidateEmployees(),
  });

  const onDelete = (e: any) => {
    const ok = confirm(`Delete employee ${e.name} ${e.last_name}?`);
    if (!ok) return;
    deleteMutation.mutate(e.id);
  };

  const onSubmitForm = (payload: any) => {
    if (mode === 'create') createMutation.mutate(payload);
    else if (editingId != null) updateMutation.mutate({ id: editingId, payload });
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Employees</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Search by Name...'
        className="app-input"
      />

      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Search by Last Name...'
        className="app-input"
      />

      <button className="app-btn app-btn-primary w-fit cursor-pointer" onClick={openCreate}>
        Add Employee
      </button>

      {error && <div className="text-red-500">Error loading employees</div>}
      {(createMutation.isError || updateMutation.isError || deleteMutation.isError) && (
        <div className="text-red-500">Error saving changes</div>
      )}

      <EmployeesTable employees={data ?? []} isLoading={isLoading} onEdit={openEdit} onDelete={onDelete}/>

      <EmployeeForm
        open={modalOpen}
        mode={mode}
        initialValues={initialValues}
        jobs={jobs}
        nationalities={nationalities}
        seniorities={seniorities}
        catalogsLoading={catalogsLoading}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={onSubmitForm}
      />
    </div>
  );
}
