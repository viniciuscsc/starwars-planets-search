import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [columnTitles, setColumnTitles] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

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

  const handleNameFilterChange = ({ target: { value } }) => {
    setNameFilter(value);
  };

  const providedObject = {
    columnTitles,
    nameFilter,
    planets,
    handleNameFilterChange,
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
