import { useState } from 'react';
import { useCountriesHook } from '../hooks/useCountriesHook';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Country from './Country';
import CountryHead from './CountryHead';
import { Search } from './Search';
import SkeletonList from './SkeletonList';

export default function CountriesList() {
  const [filter, setFilter] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useLocalStorage();
  const { data, loading, regions } = useCountriesHook({ searchValue, filter });

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const onUpdateFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <section>
      <Search
        regions={regions}
        onUpdateSearch={onUpdateSearch}
        onUpdateFilter={onUpdateFilter}
      />
      <CountryHead />
      {loading && <SkeletonList />}
      {data?.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </section>
  );
}
