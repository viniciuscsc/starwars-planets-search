import { useState } from 'react';

export default function useHandleColumnChange() {
  const [columnFilter, setColumnFilter] = useState('population');

  const handleColumnChange = ({ target: { options, selectedIndex } }) => {
    setColumnFilter(options[selectedIndex].value);
  };

  return { columnFilter, handleColumnChange };
}
