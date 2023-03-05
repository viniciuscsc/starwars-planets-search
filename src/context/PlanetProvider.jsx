import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  const handleNameInputChange = ({ target: { value } }) => {
    setNameFilter(value);
  };

  const fetchPlanets = () => {
    const URL = 'https://swapi.dev/api/planets';

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        data.results.map((planet) => delete planet.residents);
        setPlanets(data.results);
      });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <PlanetContext.Provider value={ { handleNameInputChange, nameFilter, planets } }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
