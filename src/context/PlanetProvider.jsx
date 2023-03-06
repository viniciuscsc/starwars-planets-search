import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import useFetchPlanets from '../hooks/useFetchPlanets';
import useHandleNameChange from '../hooks/useHandleNameChange';
import useHandleColumnChange from '../hooks/useHandleColumnChange';
import useHandleComparisonChange from '../hooks/useHandleComparisonChange';
import useHandleValueChange from '../hooks/useHandleValueChange';
import useChangeClickedFilter from '../hooks/useChangeClickedFilter';

export default function PlanetProvider({ children }) {
  const { planets } = useFetchPlanets();
  const { nameFilter, handleNameChange } = useHandleNameChange();
  const { columnFilter, handleColumnChange } = useHandleColumnChange();
  const { comparisonFilter, handleComparisonChange } = useHandleComparisonChange();
  const { valueFilter, handleValueChange } = useHandleValueChange();
  const { clickedFilter, changeClickedFilter } = useChangeClickedFilter();

  return (
    <PlanetContext.Provider
      value={ {
        changeClickedFilter,
        clickedFilter,
        columnFilter,
        comparisonFilter,
        handleColumnChange,
        handleComparisonChange,
        handleNameChange,
        handleValueChange,
        nameFilter,
        planets,
        valueFilter,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
