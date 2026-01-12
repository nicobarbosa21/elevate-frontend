'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EmployeesTable } from '@/components/EmployeesTable';

const API = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function Employees() {
  const[name, setName] = useState('');
  const[lastName, setLastName] = useState('');
  
  const trimmedName = name.trim();
  const trimmedLastName = lastName.trim();

  const isSearchingByName = trimmedName.length > 0;
  const isSearchingByLastName = trimmedLastName.length > 0;

  const { data: allData, isLoading: allLoading, error: allError } = useQuery({
    queryKey: ['employees_all'],
    queryFn: async () => {
      const response = await fetch(`${API}employees`);
      if (!response.ok) throw new Error('Error fetching data');
      return response.json();
    },
  });

  const { data: nameData, isLoading: nameLoading, error: nameError } = useQuery({
    queryKey: ['employees_name', trimmedName],
    enabled: isSearchingByName,
    queryFn: async () => {
      const endpoint = `${API}employees/name/${trimmedName}`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Error fetching data');
      return response.json();
    },
  });

  const { data: lastNameData, isLoading: lastNameLoading, error: lastNameError } = useQuery({
    queryKey: ['employees_lastName', trimmedLastName],
    enabled: isSearchingByLastName,
    queryFn: async () => {
      const endpoint = `${API}employees/last_name/${trimmedLastName}`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Error fetching data');
      return response.json();
    },
  });
  
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

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-zinc-900">Employees</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Search by Name...'
        className="border border-gray-300 rounded-md p-2 w-full text-black"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Search by Last Name...'
        className="border border-gray-300 rounded-md p-2 w-full text-black"
      />
      {error && <div className="text-red-500">Error loading employees</div>}
      <EmployeesTable employees={data ?? []} isLoading={isLoading}/>
    </div>
  );
}
