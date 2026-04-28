import React, { useEffect, useState } from 'react';

interface Cat {
  id: number;
  name: string;
}

export const CatsList: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/cats?limit=10');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cats');
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  if (loading) {
    return <div data-testid="loading">Loading cats...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  return (
    <div data-testid="cats-list">
      <h1>Cats</h1>
      {cats.length === 0 ? (
        <p>No cats found</p>
      ) : (
        <ul>
          {cats.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
