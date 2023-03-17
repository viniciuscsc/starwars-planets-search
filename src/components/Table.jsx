import React, { useContext } from 'react';
import ContextPlanetas from '../context/ContextPlanetas';

export default function Table() {
  const {
    coluna,
    nome,
    opcoesFiltroColuna,
    opcoesFiltroComparacao,
    operador,
    planetas,
    titulosColunas,
    valor,
    aplicaNovoFiltro,
    recebeOpcaoSelecionada,
    recebeTextoDigitado } = useContext(ContextPlanetas);

  return (
    <div>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          value={ nome }
          onChange={ recebeTextoDigitado }
        />
      </div>

      <div>
        <label htmlFor="coluna">
          {'Coluna: '}
          <select
            data-testid="column-filter"
            id="coluna"
            value={ coluna }
            onChange={ recebeOpcaoSelecionada }
          >
            {opcoesFiltroColuna.map((opcao) => (
              <option key={ opcao } value={ opcao }>{opcao}</option>
            ))}
          </select>
        </label>

        <label htmlFor="operador">
          {' Operador: '}
          <select
            data-testid="comparison-filter"
            id="operador"
            value={ operador }
            onChange={ recebeOpcaoSelecionada }
          >
            {opcoesFiltroComparacao.map((opcao) => (
              <option key={ opcao } value={ opcao }>{opcao}</option>
            ))}
          </select>
        </label>

        <label htmlFor="valor">
          {' Valor: '}
          <input
            data-testid="value-filter"
            type="number"
            id="valor"
            value={ valor }
            onChange={ recebeTextoDigitado }
          />
        </label>

        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => aplicaNovoFiltro(planetas) }
        >
          Filtrar
        </button>
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
            .filter(({ name }) => name.includes(nome))
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
