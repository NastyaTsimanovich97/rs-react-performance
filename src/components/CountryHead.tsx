import { memo } from 'react';

interface ICountryHeadProps {
  nameSort: string;
  populationSort: string;
  onUpdateNameSort: () => void;
  onUpdatePopulationSort: () => void;
}

const CountryHead = memo(function CountryHead({
  nameSort,
  populationSort,
  onUpdateNameSort,
  onUpdatePopulationSort,
}: ICountryHeadProps) {
  const ASC = '↓';
  const DESC = '↑';

  return (
    <div className="list-head-wrapper">
      <h3 className="header-clickable" onClick={onUpdateNameSort}>
        Name {nameSort === 'ASC' ? ASC : DESC}
      </h3>
      <h3>Region</h3>
      <h3 className="header-clickable" onClick={onUpdatePopulationSort}>
        Population {populationSort === 'ASC' ? ASC : DESC}
      </h3>
      <h3>Flag</h3>
    </div>
  );
});

export default CountryHead;
