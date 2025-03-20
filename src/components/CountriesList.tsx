import { useCountriesHook } from '../hooks/useCountriesHook';
import Country from './Country';
import CountryHead from './CountryHead';
import SkeletonList from './SkeletonList';

export default function CountriesList() {
  const { data, loading } = useCountriesHook();
  return (
    <section>
      <CountryHead />
      {loading && <SkeletonList />}
      {data?.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </section>
  );
}
