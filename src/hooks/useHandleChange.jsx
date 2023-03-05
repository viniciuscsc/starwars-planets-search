import { useState } from 'react';

export default function useHandleChange() {
  const [nameFilter, setNameFilter] = useState('');

  const handleNameInputChange = ({ target: { value } }) => {
    setNameFilter(value);
  };

  return { nameFilter, handleNameInputChange };
}
