'use client';

import { useQuery } from '@tanstack/react-query';

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}random_joke`);
      return response.json();
    },
  });

  if (isLoading) {return <div className='text-black'>Loading...</div>;}
  if (error) {return <div className='text-black'>Error loading jokes</div>;}

  const handleReload = () => {
    refetch();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-zinc-900">Italian Jokes</h1>
      {joke && (
        <div key={joke.id} className="p-4 border border-gray-200 rounded-md">
          <p className="text-zinc-800">{joke.joke}</p>
          <p className="text-sm text-gray-500 mt-2">Type: {joke.type}, Subtype: {joke.subtype}</p><br/>
          <button 
            className="p-2 border border-gray-300 text-black hover:bg-gray-100 rounded"
            onClick={handleReload}
          >
            Reload
            </button>
        </div>
      )}
    </div>
  );
}
