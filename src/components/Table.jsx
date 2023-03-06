import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const {
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
  } = useContext(PlanetContext);

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const comparisonOptions = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Filtrar por nome"
          data-testid="name-filter"
          onChange={ handleNameChange }
        />
      </div>
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ handleColumnChange }
      >
        {columnOptions.map((option, i) => (
          <option key={ i }>{option}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ handleComparisonChange }
      >
        {comparisonOptions.map((option, i) => (
          <option key={ i }>{option}</option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ handleValueChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ changeClickedFilter }
      >
        Filtrar
      </button>
      {clickedFilter && (
        <div>
          <span>{`${columnFilter} ${comparisonFilter} ${valueFilter}`}</span>
          <button
            type="button"
          >
            Excluir filtro
          </button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {clickedFilter
            ? planets
              .filter(({ name }) => name.includes(nameFilter))
              .filter((planet) => {
                switch (comparisonFilter) {
                case 'maior que':
                  return planet[columnFilter] > valueFilter;

                case 'menor que':
                  return planet[columnFilter] < valueFilter;

                case 'igual a':
                  return planet[columnFilter] === valueFilter;

                default:
                  return 0;
                }
              })
              .map((planet) => (
                <tr key={ planet.url }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))
            : planets
              .filter(({ name }) => name.includes(nameFilter))
              .map((planet) => (
                <tr key={ planet.url }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
}
