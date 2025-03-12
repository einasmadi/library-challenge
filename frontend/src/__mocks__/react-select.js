import React from 'react';

const Select = ({ id, options, value, onChange, placeholder }) => {
  const handleChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    onChange(selectedOption);
  };

  return (
    <select
      id={id}
      data-testid="mock-select"
      value={value ? value.value : ''}
      onChange={handleChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;