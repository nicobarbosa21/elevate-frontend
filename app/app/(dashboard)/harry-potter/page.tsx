'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BooksTable } from '@/components/BooksTable';
import { CharactersTable } from '@/components/CharactersTable';
import { SpellsTable } from '@/components/SpellsTable';
import { apiFetch } from '@/lib/api';

type Tab = 'books' | 'characters' | 'spells';

const base = `${process.env.NEXT_PUBLIC_API_URL}harry_potter/`;

export default function HarryPotter() {
  const [tab, setTab] = useState<Tab>('books');
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: [tab, search],
    queryFn: async () => {
      const endpoint =
        tab === 'books' ? `${base}books/${search}` :
        tab === 'characters' ? `${base}characters/${search}` :
        `${base}spells/${search}`;

      const response = await apiFetch(endpoint);
      return response.json();
    },
  });

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setSearch('');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Harry Potter</h1>
      <div className="flex gap-3 flex-wrap">
        <button 
          onClick={() => handleTabChange('books')} 
          className={`app-btn ${tab === 'books' ? 'app-btn-soft' : 'app-btn-outline'} w-fit`}
        >
          Books
        </button>
        <button 
          onClick={() => handleTabChange('characters')} 
          className={`app-btn ${tab === 'characters' ? 'app-btn-soft' : 'app-btn-outline'} w-fit`}
        >
          Characters
        </button>
        <button 
          onClick={() => handleTabChange('spells')}
          className={`app-btn ${tab === 'spells' ? 'app-btn-soft' : 'app-btn-outline'} w-fit`}
        >
          Spells
        </button>
      </div>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search...'
        className='app-input max-w-md'
      />

      {error && <div className="app-muted">Error</div>}
      {tab === 'books' && <BooksTable books={data ?? []} isLoading={isLoading}/>}
      {tab === 'characters' && <CharactersTable characters={data ?? []} isLoading={isLoading}/>}
      {tab === 'spells' && <SpellsTable spells={data ?? []} isLoading={isLoading}/>}
    </div>
  );
}
