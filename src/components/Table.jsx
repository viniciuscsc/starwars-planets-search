import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
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
    handleFilterChange } = useContext(PlanetsContext);

  const columnFilterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const comparisonFilterOptions = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filtrar por nome"
          id="name-filter"
          data-testid="name-filter"
          onChange={ handleFilterChange }
        />
      </div>

      <label htmlFor="column-filter">
        {'Coluna: '}
        <select
          id="column-filter"
          data-testid="column-filter"
          onChange={ handleColumnFilterChange }
        >
          {columnFilterOptions.map((opt) => (
            <option key={ opt } value={ opt }>{opt}</option>
          ))}
        </select>
      </label>

      <label htmlFor="comparison-filter">
        {' Operador: '}
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ handleComparisonFilterChange }
        >
          {comparisonFilterOptions.map((opt) => (
            <option key={ opt } value={ opt }>{opt}</option>
          ))}
        </select>
      </label>

      <label htmlFor="value-filter">
        {' Valor: '}
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          onChange={ handleFilterChange }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterBtnClick }
      >
        Filtrar
      </button>

      <table>
        <thead>
          <tr>
            {columnTitles.map((title) => (
              <th key={ title }>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isFiltering
            ? planets
              .filter(({ name }) => name.includes(nameFilter))
              .filter((planet) => {
                if (comparisonFilter === 'maior que') {
                  return Number(planet[columnFilter]) > Number(valueFilter);
                }
                if (comparisonFilter === 'menor que') {
                  return Number(planet[columnFilter]) < Number(valueFilter);
                }
                return Number(planet[columnFilter]) === Number(valueFilter);
              })
              .map((planet) => (
                <tr key={ planet.url }>
                  {Object.keys(planet).map((e) => (
                    <td key={ e }>{planet[e]}</td>
                  ))}
                </tr>
              ))
            : planets
              .filter(({ name }) => name.includes(nameFilter))
              .map((planet) => (
                <tr key={ planet.url }>
                  {Object.keys(planet).map((e) => (
                    <td key={ e }>{planet[e]}</td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
