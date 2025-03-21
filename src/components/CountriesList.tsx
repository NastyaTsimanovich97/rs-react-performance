import { useCallback, useMemo, useState } from 'react';
import { useCountriesHook } from '../hooks/useCountriesHook';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Country from './Country';
import CountryHead from './CountryHead';
import { Search } from './Search';
import SkeletonList from './SkeletonList';
import { ICountry } from '../interfaces/country';

export default function CountriesList() {
  const [filter, setFilter] = useState<string | null>(null);
  const [nameSort, setNameSort] = useState<string>('ASC');
  const [populationSort, setPopulationSort] = useState<string>('ASC');

  const [searchValue, setSearchValue] = useLocalStorage();
  const [visited, setVisited] = useLocalStorage('visited');
  const { data, loading, regions, setData } = useCountriesHook({
    searchValue,
    filter,
  });

  const onUpdateVisited = useCallback(
    (country: string) => {
      const visitedObj = visited ? JSON.parse(visited) : {};
      visitedObj[country] = !visitedObj[country];

      setVisited(JSON.stringify(visitedObj));
    },
    [visited]
  );

  const onUpdateSearch = useCallback(
    (searchValue: string) => {
      setSearchValue(searchValue || '');
    },
    [searchValue]
  );

  const onUpdateFilter = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const onUpdateNameSort = () => {
    setNameSort((state) => (state === 'ASC' ? 'DESC' : 'ASC'));

    const values: ICountry[] | null = data
      ? data.sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
          const compareNames =
            nameSort === 'ASC'
              ? nameA.localeCompare(nameB)
              : nameB.localeCompare(nameA);

          return compareNames;
        })
      : null;

    setData(values);
  };

  const onUpdatePopulationSort = () => {
    setPopulationSort((state) => (state === 'ASC' ? 'DESC' : 'ASC'));

    const values: ICountry[] | null = data
      ? data.sort((a, b) => {
          return populationSort === 'ASC'
            ? a.population - b.population
            : b.population - a.population;
        })
      : null;

    setData(values);
  };

  const renderedItems = useMemo(() => {
    const visitedObj = visited ? JSON.parse(visited) : {};

    return data?.map((country) => (
      <Country
        visited={visitedObj[country.name.common]}
        onUpdateVisited={onUpdateVisited}
        key={country.name.common}
        country={country}
      />
    ));
  }, [data, nameSort, populationSort, searchValue, visited]);

  return (
    <section>
      <Search
        regions={regions}
        onUpdateSearch={onUpdateSearch}
        onUpdateFilter={onUpdateFilter}
      />
      <CountryHead
        nameSort={nameSort}
        populationSort={populationSort}
        onUpdateNameSort={onUpdateNameSort}
        onUpdatePopulationSort={onUpdatePopulationSort}
      />
      {loading && <SkeletonList />}
      {renderedItems}
    </section>
  );
}
