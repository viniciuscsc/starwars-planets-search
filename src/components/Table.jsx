import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    columnFilter,
    columnTitles,
    comparisonFilter,
    columnFilterOpt,
    nameFilter,
    planets,
    valueFilter,
    handleColumnFilterChange,
    handleComparisonFilterChange,
    handleFilterBtnClick,
    handleFilterChange } = useContext(PlanetsContext);

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
          {columnFilterOpt.map((opt) => (
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
          value={ valueFilter }
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

      <div>
        <p>
          {`${columnFilter} ${comparisonFilter} ${valueFilter} `}
          <button type="button">Remover</button>
        </p>
      </div>

      <table>
        <thead>
          <tr>
            {columnTitles.map((title) => (
              <th key={ title }>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets
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
