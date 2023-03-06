import { useState } from 'react';

export default function useHandleNameChange() {
  const [nameFilter, setNameFilter] = useState('');

  const handleNameChange = ({ target: { value } }) => {
    setNameFilter(value);
  };

  return { nameFilter, handleNameChange };
}
