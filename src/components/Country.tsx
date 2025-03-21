import { memo } from 'react';
import classNames from 'classnames';
import { ICountry } from '../interfaces/country';

interface ICountryProps {
  country: ICountry;
  visited: boolean;
  onUpdateVisited: (data: string) => void;
}

const Country = memo(function Country({
  country,
  onUpdateVisited,
  visited,
}: ICountryProps) {
  const listClass = classNames('list-item-wrapper', {
    'list-item-highlighted': visited,
  });

  return (
    <div
      className={listClass}
      onClick={() => onUpdateVisited(country.name.common)}
    >
      <p>{country.name.common}</p>
      <p>{country.region}</p>
      <p>{country.population}</p>
      <p>{country.flag}</p>
    </div>
  );
});

export default Country;
