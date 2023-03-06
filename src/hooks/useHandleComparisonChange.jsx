import { useState } from 'react';

export default function useHandleComparisonChange() {
  const [comparisonFilter, setComparisonFilter] = useState('maior que');

  const handleComparisonChange = ({ target: { options, selectedIndex } }) => {
    setComparisonFilter(options[selectedIndex].value);
  };

  return { comparisonFilter, handleComparisonChange };
}
