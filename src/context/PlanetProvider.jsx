import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import useFetchPlanets from '../hooks/useFetchPlanets';
import useHandleChange from '../hooks/useHandleChange';

export default function PlanetProvider({ children }) {
  const { planets } = useFetchPlanets();
  const { nameFilter, handleNameInputChange } = useHandleChange();

  return (
    <PlanetContext.Provider value={ { handleNameInputChange, nameFilter, planets } }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
