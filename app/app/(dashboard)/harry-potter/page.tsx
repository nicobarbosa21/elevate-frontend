'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BooksTable } from '@/components/BooksTable';
import { CharactersTable } from '@/components/CharactersTable';
import { SpellsTable } from '@/components/SpellsTable';

type Tab = 'books' | 'characters' | 'spells';

const base = `${process.env.NEXT_PUBLIC_API_URL}harry_potter/`;

export default function HarryPotter() {
  const [tab, setTab] = useState<Tab>('books');
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: [tab, search],
    queryFn: async () => {
      const endpoint =
        tab === 'books' ? `${base}books/${search ? `${search}` : ''}` :
        tab === 'characters' ? `${base}characters/${search ? `${search}` : ''}` :
        `${base}spells/${search ? `${search}` : ''}`;
    
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Error fetching data');
      return response.json();
    },
  });

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setSearch('');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-black">Harry Potter</h1>
      <div className="flex gap-3 text-black">
        <button 
          onClick={() => handleTabChange('books')} 
          className={tab === 'books' ? 'font-bold' : ''}
        >
          Books
        </button>
        <button 
          onClick={() => handleTabChange('characters')} 
          className={tab === 'characters' ? 'font-bold' : ''}
        >
          Characters
        </button>
        <button 
          onClick={() => handleTabChange('spells')}
          className={tab === 'spells' ? 'font-bold' : ''}
        >
          Spells
        </button>
      </div>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search...'
        className='border rounded px-3 py-2 text-black'
      />

      {error && <div>Error</div>}
      {tab === 'books' && <BooksTable books={data ?? []} isLoading={isLoading}/>}
      {tab === 'characters' && <CharactersTable characters={data ?? []} isLoading={isLoading}/>}
      {tab === 'spells' && <SpellsTable spells={data ?? []} isLoading={isLoading}/>}
    </div>
  );
}
