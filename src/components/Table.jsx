import React, { useContext } from 'react';
import ContextPlanetas from '../context/ContextPlanetas';

export default function Table() {
  const {
    coluna,
    nome,
    filtrosAplicados,
    opcoesFiltroColuna,
    opcoesFiltroComparacao,
    operador,
    planetas,
    titulosColunas,
    valor,
    aplicaFiltro,
    recebeOpcaoSelecionada,
    recebeTextoDigitado,
    removeFiltro,
    removeTodosFiltros } = useContext(ContextPlanetas);

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
          onClick={ () => aplicaFiltro(planetas, coluna, operador, valor) }
        >
          Filtrar
        </button>

        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ removeTodosFiltros }
        >
          Remover filtros
        </button>

      </div>

      {filtrosAplicados
        && filtrosAplicados.map((filtro, index) => (
          <p key={ index } data-testid="filter">
            <span>{`${filtro.coluna} ${filtro.operador} ${filtro.valor} `}</span>
            <button
              type="button"
              id={ filtro.coluna }
              onClick={ removeFiltro }
            >
              Remover
            </button>
          </p>
        ))}

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
                {Object.values(planeta).map((value, index) => (
                  <td key={ index }>{value}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
