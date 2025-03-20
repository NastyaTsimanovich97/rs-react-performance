import { ICountry } from '../interfaces/country';

interface ICountryProps {
  country: ICountry;
}

export default function Country({ country }: ICountryProps) {
  return (
    <div className="list-item-wrapper">
      <p>{country.name.common}</p>
      <p>{country.region}</p>
      <p>{country.population}</p>
      <p>{country.flag}</p>
    </div>
  );
}
