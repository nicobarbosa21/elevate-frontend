'use client';

import React, { useEffect, useMemo, useState } from 'react';

type Job = { id: number; title: string };
type Nationality = { id: number; country_name: string; country_code: string };
type Seniority = { id: number; level: string };

type FormState = {
  name: string;
  last_name: string;
  age: string;
  dni: string;
  job_id: string;
  country_id: string;
  seniority_id: string;
};

const emptyForm: FormState = {
  name: '',
  last_name: '',
  age: '',
  dni: '',
  job_id: '',
  country_id: '',
  seniority_id: '',
};

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: Partial<FormState>;

  jobs: Job[];
  nationalities: Nationality[];
  seniorities: Seniority[];
  catalogsLoading?: boolean;

  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    name: string;
    last_name: string;
    age: number;
    dni: string;
    job_id: number;
    country_id: number;
    seniority_id: number;
  }) => void;
};

export function EmployeeForm({
    open,
    mode,
    initialValues,
    jobs,
    nationalities,
    seniorities,
    catalogsLoading,
    isSubmitting,
    onClose,
    onSubmit,
}: Props) {
    const [form, setForm] = useState<FormState>(emptyForm);

    useEffect(() => {
        if (!open) return;
        setForm({
            ...emptyForm,
            ...initialValues,
        });
    }, [open, initialValues]);

    const dniError = useMemo(() => {
        const v = form.dni.trim();
        if (!v) return null;
        if (!/^\d{7,8}$/.test(v)) return 'DNI must be 7 or 8 digits';
        return null;
    }, [form.dni]);

    if (!open) return null;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            name: form.name.trim(),
            last_name: form.last_name.trim(),
            age: Number(form.age),
            dni: form.dni.trim(),
            job_id: Number(form.job_id),
            country_id: Number(form.country_id),
            seniority_id: Number(form.seniority_id),
        };

        if (!payload.name || !payload.last_name) {
        alert('Name and Last name are required');
        return;
        }

        if (!payload.dni || dniError) {
        alert(dniError ?? 'DNI is required');
        return;
        }

        if (Number.isNaN(payload.age)) {
        alert('Age must be a number');
        return;
        }

        if (
        Number.isNaN(payload.job_id) ||
        Number.isNaN(payload.country_id) ||
        Number.isNaN(payload.seniority_id)
        ) {
        alert('Please select Job, Country and Seniority');
        return;
        }
        
        onSubmit(payload);
    };

    const disabled = !!isSubmitting || !!catalogsLoading;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">
            {mode === 'create' ? 'Add employee' : 'Edit employee'}
          </h2>
          <button className="text-black" onClick={onClose} disabled={disabled}>
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              className="border p-2 text-black"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={disabled}
            />

            <input
              className="border p-2 text-black"
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              disabled={disabled}
            />

            <input
              className="border p-2 text-black"
              placeholder="Age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              disabled={disabled}
            />

            <div className="space-y-1">
              <input
                className="border p-2 text-black w-full"
                placeholder="DNI (7-8 digits)"
                inputMode="numeric"
                value={form.dni}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, '');
                  setForm({ ...form, dni: onlyDigits });
                }}
                disabled={disabled}
              />
              {dniError && <div className="text-xs text-red-600">{dniError}</div>}
            </div>

            <select
              className="border p-2 text-black"
              value={form.job_id}
              onChange={(e) => setForm({ ...form, job_id: e.target.value })}
              disabled={disabled}
            >
              <option value="">{catalogsLoading ? 'Loading jobs...' : 'Select job...'}</option>
              {jobs.map((j) => (
                <option key={j.id} value={String(j.id)}>
                  {j.title}
                </option>
              ))}
            </select>

            <select
              className="border p-2 text-black"
              value={form.country_id}
              onChange={(e) => setForm({ ...form, country_id: e.target.value })}
              disabled={disabled}
            >
              <option value="">
                {catalogsLoading ? 'Loading countries...' : 'Select country...'}
              </option>
              {nationalities.map((n) => (
                <option key={n.id} value={String(n.id)}>
                  {n.country_name} ({n.country_code})
                </option>
              ))}
            </select>

            <select
              className="border p-2 text-black"
              value={form.seniority_id}
              onChange={(e) => setForm({ ...form, seniority_id: e.target.value })}
              disabled={disabled}
            >
              <option value="">
                {catalogsLoading ? 'Loading seniorities...' : 'Select seniority...'}
              </option>
              {seniorities.map((s) => (
                <option key={s.id} value={String(s.id)}>
                  {s.level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-md border px-4 py-2 text-black hover:bg-gray-100 transition duration-200 cursor-pointer disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={disabled}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md border px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800 transition duration-200 cursor-pointer disabled:cursor-not-allowed"
              disabled={disabled}
            >
              {mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
