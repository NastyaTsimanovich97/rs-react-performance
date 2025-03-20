import { useState } from 'react';

interface IDropdownProps {
  options: string[] | null;
  onUpdateFilter: (value: string) => void;
}

export default function Dropdown({ options, onUpdateFilter }: IDropdownProps) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onUpdateFilter(value);
    setSelectedOption(value);
  };

  return (
    <div className="dropdown-wrapper">
      <label htmlFor="options">Select a region:</label>
      <select id="options" value={selectedOption} onChange={handleChange}>
        <option value="">--Select--</option>
        {options?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
