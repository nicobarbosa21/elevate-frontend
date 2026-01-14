'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

type Joke = {
  id: number;
  joke: string;
  type: string;
  subtype: string;
}

export default function ItalianJokes() {
  const { data: joke, error, isLoading, refetch } = useQuery<Joke>({
    queryKey: ['italianJokes'],
    queryFn: async () => {
      const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}jokes/random_joke`);
      return response.json();
    },
  });

  if (isLoading) {return <div className='app-muted'>Loading...</div>;}
  if (error) {return <div className='app-muted'>Error loading jokes</div>;}

  const handleReload = () => {
    refetch();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Italian Jokes</h1>
      {joke && (
        <div key={joke.id} className="app-card p-5 space-y-3">
          <p className="text-base">{joke.joke}</p>
          <p className="text-sm app-muted">Type: {joke.type}, Subtype: {joke.subtype}</p>
          <button 
            className="app-btn app-btn-primary w-fit"
            onClick={handleReload}
          >
            Reload
          </button>
        </div>
      )}
    </div>
  );
}
