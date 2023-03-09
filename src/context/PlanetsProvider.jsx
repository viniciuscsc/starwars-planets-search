import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [columnTitles, setColumnTitles] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('rotation_period');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [isFiltering, setIsFiltering] = useState(false);

  const fetchPlanets = async () => {
    const URL = 'https://swapi.dev/api/planets';

    const response = await fetch(URL);
    const data = await response.json();
    data.results.map((result) => delete result.residents);

    setPlanets(data.results);
    setColumnTitles(Object.keys(data.results[0]));
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const handleFilterChange = ({ target: { id, value } }) => {
    if (id === 'name-filter') setNameFilter(value);
    if (id === 'value-filter') setValueFilter(value);
  };

  const handleColumnFilterChange = ({ target: { options, selectedIndex } }) => {
    const valueOpt = options[selectedIndex].value;
    setColumnFilter(valueOpt);
  };

  const handleComparisonFilterChange = ({ target: { options, selectedIndex } }) => {
    const valueOpt = options[selectedIndex].value;
    setComparisonFilter(valueOpt);
  };

  const handleFilterBtnClick = () => {
    setIsFiltering(true);
  };

  const providedObject = {
    columnFilter,
    columnTitles,
    comparisonFilter,
    isFiltering,
    nameFilter,
    planets,
    valueFilter,
    handleColumnFilterChange,
    handleComparisonFilterChange,
    handleFilterBtnClick,
    handleFilterChange,
  };

  return (
    <PlanetsContext.Provider value={ providedObject }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
