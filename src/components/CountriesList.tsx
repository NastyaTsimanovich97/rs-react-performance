import { useState } from 'react';
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
  const { data, loading, regions, setData } = useCountriesHook({
    searchValue,
    filter,
  });

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const onUpdateFilter = (value: string) => {
    setFilter(value);
  };

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
      {data?.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </section>
  );
}
