import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    columnTitles,
    nameFilter,
    planets,
    handleNameFilterChange } = useContext(PlanetsContext);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nome"
        data-testid="name-filter"
        // value={ nameFilter }
        onChange={ handleNameFilterChange }
      />
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
            .filter((planet) => planet.name.includes(nameFilter))
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
