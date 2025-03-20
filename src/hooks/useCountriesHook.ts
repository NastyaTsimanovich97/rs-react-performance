import { useEffect, useState } from 'react';
import { ICountry } from '../interfaces/country';

const URL = 'https://restcountries.com/v3.1/all';

export function useCountriesHook() {
  const [data, setData] = useState<ICountry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(URL);

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          setError('Server is not available');
          throw new Error('Server is not available');
        }
      } catch (err) {
        setError((err as { message: string }).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
}
