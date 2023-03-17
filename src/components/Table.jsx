import React, { useContext } from 'react';
import ContextPlanetas from '../context/ContextPlanetas';

export default function Table() {
  const {
    filtroNome,
    planetas,
    titulosColunas,
    capturaValorFiltroNome } = useContext(ContextPlanetas);

  return (
    <div>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          onChange={ capturaValorFiltroNome }
        />
      </div>
      <table>
        <thead>
          <tr>
            {titulosColunas.map((titulo) => (
              <th key={ titulo }>{titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetas
            .filter(({ name }) => name.includes(filtroNome))
            .map((planeta) => (
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
