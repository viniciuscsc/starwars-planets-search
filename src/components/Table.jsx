import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { columnTitles, planets } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          {columnTitles.map((title) => (
            <th key={ title }>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={ planet.url }>
            {Object.keys(planet).map((e) => (
              <td key={ e }>{planet[e]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
