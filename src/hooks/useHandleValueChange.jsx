import { useState } from 'react';

export default function useHandleValueChange() {
  const [valueFilter, setValueFilter] = useState(0);

  const handleValueChange = ({ target: { value } }) => {
    setValueFilter(value);
  };

  return { valueFilter, handleValueChange };
}
