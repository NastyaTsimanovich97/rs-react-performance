import { useEffect, useState } from 'react';
import { ICountry } from '../interfaces/country';

const URL = 'https://restcountries.com/v3.1/all';

interface ICountriesProps {
  searchValue: string;
  filter: string | null;
}

export function useCountriesHook({ searchValue, filter }: ICountriesProps) {
  const [data, setData] = useState<ICountry[] | null>(null);
  const [regions, setRegions] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(URL);

        if (response.ok) {
          let data: ICountry[] = await response.json();

          const regions = [...new Set(data.map((item) => item.region))];
          setRegions(regions);

          if (searchValue) {
            data = data.filter((item) => {
              const name = item.name.common.toLowerCase();
              if (name.includes(searchValue.toLowerCase())) {
                return item;
              }
            });
          }

          if (filter) {
            data = data.filter((item) => item.region.includes(filter));
          }

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
  }, [searchValue, filter]);

  return { data, error, loading, regions };
}
