import { useState } from 'react';

export default function useChangeClickedFilter() {
  const [clickedFilter, setClickedFilter] = useState(false);

  const changeClickedFilter = () => setClickedFilter(true);

  return { clickedFilter, changeClickedFilter };
}
