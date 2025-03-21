import { useLocalStorage } from '../hooks/useLocalStorage';
import Dropdown from './Dropdown';

interface ISearchProps {
  regions: string[] | null;
  onUpdateSearch: (value: string) => void;
  onUpdateFilter: (value: string) => void;
}

export function Search(props: ISearchProps) {
  const [searchValue, setSearchValue] = useLocalStorage();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleButtonClick = () => {
    const value = searchValue.trim();

    setSearchValue(value);
    props.onUpdateSearch(value);
  };

  return (
    <>
      <div className="search-container">
        <input
          placeholder="Input your search"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      <Dropdown options={props.regions} onUpdateFilter={props.onUpdateFilter} />
    </>
  );
}
