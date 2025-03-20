import { useCountriesHook } from '../hooks/useCountriesHook';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Country from './Country';
import CountryHead from './CountryHead';
import { Search } from './Search';
import SkeletonList from './SkeletonList';

export default function CountriesList() {
  const [searchValue, setSearchValue] = useLocalStorage();
  const { data, loading } = useCountriesHook({ searchValue });

  const onUpdateSearch = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  return (
    <section>
      <Search onUpdateSearch={onUpdateSearch} />
      <CountryHead />
      {loading && <SkeletonList />}
      {data?.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </section>
  );
}
