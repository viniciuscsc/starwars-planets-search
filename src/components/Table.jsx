import React, { useContext } from 'react';
import ContextPlanetas from '../context/ContextPlanetas';

export default function Table() {
  const {
    planetas,
    titulosColunas } = useContext(ContextPlanetas);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {titulosColunas.map((titulo) => (
              <th key={ titulo }>{titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetas.map((planeta) => (
            <tr key={ planeta.name }>
              {Object.values(planeta).map((valor, index) => (
                <td key={ index }>{valor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
