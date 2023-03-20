import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ContextPlanetas from './ContextPlanetas';

export default function ProviderPlanetas({ children }) {
  const [planetas, setPlanetas] = useState([]);
  const [nome, setNome] = useState('');
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [valor, setValor] = useState(0);
  const [filtrosAplicados, setFiltrosAplicados] = useState([]);
  const [opcoesFiltroColuna, setOpcoesFiltroColuna] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [colunaOrdenar, setColunaOrdenar] = useState('population');
  const [radioClicado, setRadioClicado] = useState('');

  const [backupPlanetas, setBackupPlanetas] = useState([]);
  const [titulosColunas, setTitulosColunas] = useState([]);

  const opcoesFiltroComparacao = [
    'maior que',
    'menor que',
    'igual a',
  ];
  const backupOpcoesFiltroColuna = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const buscaPlanetas = async () => {
    const URL = 'https://swapi.dev/api/planets';

    const resposta = await fetch(URL);
    const dados = await resposta.json();
    const planetasAPI = dados.results;

    planetasAPI.filter((planeta) => delete planeta.residents);
    setPlanetas(planetasAPI);
    setBackupPlanetas(planetasAPI);

    const titulosColunasAPI = Object.keys(planetasAPI[0]);
    setTitulosColunas(titulosColunasAPI);
  };

  useEffect(() => {
    buscaPlanetas();
  }, []);

  const recebeTextoDigitado = ({ target: { type, value } }) => {
    const textoDigitado = value;
    if (type === 'text') setNome(textoDigitado);
    if (type === 'number') setValor(textoDigitado);
  };

  const recebeOpcaoSelecionada = ({ target: { id, options, selectedIndex } }) => {
    const opcaoSelecionada = options[selectedIndex].value;
    if (id === 'coluna') setColuna(opcaoSelecionada);
    if (id === 'operador') setOperador(opcaoSelecionada);
    if (id === 'coluna-ordenar') setColunaOrdenar(opcaoSelecionada);
  };

  const aplicaFiltro = (arrayPlanetas, opcaoColuna, opcaoOperador, valorDigitado) => {
    // 1 - adicionar filtro ao array de filtros aplicados
    const novoFiltrosAplicados = filtrosAplicados
      .concat({
        coluna: opcaoColuna,
        operador: opcaoOperador,
        valor: valorDigitado,
      });
    setFiltrosAplicados(novoFiltrosAplicados);

    // 2 - executar a lógica do filtro para atualizar o array de planetas
    const novoPlanetas = arrayPlanetas.filter((planeta) => {
      if (opcaoOperador === 'maior que') {
        return Number(planeta[opcaoColuna]) > Number(valorDigitado);
      }
      if (opcaoOperador === 'menor que') {
        return Number(planeta[opcaoColuna]) < Number(valorDigitado);
      }
      return Number(planeta[opcaoColuna]) === Number(valorDigitado);
    });
    setPlanetas(novoPlanetas);

    // 3 - remover a coluna escolhida do array de opções de filtro de coluna
    const novoOpcoesFiltroColuna = opcoesFiltroColuna
      .filter((opcao) => opcao !== opcaoColuna);
    setOpcoesFiltroColuna(novoOpcoesFiltroColuna);

    // 4 - definir valores iniciais dos campos de select e input do valor
    setColuna(novoOpcoesFiltroColuna[0]);
    setOperador('maior que');
    setValor(0);
  };

  const removeFiltro = ({ target: { id } }) => {
    // 1 - adicionar a coluna do filtro removido do array de opções de filtro de coluna
    const novoOpcoesFiltroColuna = opcoesFiltroColuna.concat(id);
    setOpcoesFiltroColuna(novoOpcoesFiltroColuna);

    // 2 - remover filtro do array de filtro aplicados
    const novoFiltrosAplicados = filtrosAplicados
      .filter((filtro) => filtro.coluna !== id);
    setFiltrosAplicados(novoFiltrosAplicados);

    // 3 - aplicar filtro do array de filtros aplicados ao backup planetas
    let planetasInicial = backupPlanetas;

    novoFiltrosAplicados.forEach((filtro) => {
      const novoPlanetas = planetasInicial.filter((planeta) => {
        if (filtro.operador === 'maior que') {
          return Number(planeta[filtro.coluna]) > Number(filtro.valor);
        }
        if (filtro.operador === 'menor que') {
          return Number(planeta[filtro.coluna]) < Number(filtro.valor);
        }
        return Number(planeta[filtro.coluna]) === Number(filtro.valor);
      });
      planetasInicial = novoPlanetas;
    });
    setPlanetas(planetasInicial);
  };

  const removeTodosFiltros = () => {
    setPlanetas(backupPlanetas);
    setFiltrosAplicados([]);
    setOpcoesFiltroColuna(backupOpcoesFiltroColuna);
    setColuna('population');
    setOperador('maior que');
    setValor(0);
  };

  const ordenaPlanetas = () => {
    const tipoOrdenacao = radioClicado;

    if (tipoOrdenacao === 'ASC') {
      const arrayOrdenado = planetas.sort((a, b) => a[colunaOrdenar] - b[colunaOrdenar]);

      const arraySemUnknown = arrayOrdenado
        .filter((elemento) => elemento[colunaOrdenar] !== 'unknown');

      const arrayDeUnknown = arrayOrdenado
        .filter((elemento) => elemento[colunaOrdenar] === 'unknown');

      const novoPlanetas = arraySemUnknown.concat(...arrayDeUnknown);

      setPlanetas([...novoPlanetas]);
    }
    if (tipoOrdenacao === 'DESC') {
      const arrayOrdenado = planetas.sort((a, b) => b[colunaOrdenar] - a[colunaOrdenar]);

      const arraySemUnknown = arrayOrdenado
        .filter((elemento) => elemento[colunaOrdenar] !== 'unknown');

      const arrayDeUnknown = arrayOrdenado
        .filter((elemento) => elemento[colunaOrdenar] === 'unknown');

      const novoPlanetas = arraySemUnknown.concat(...arrayDeUnknown);

      setPlanetas([...novoPlanetas]);
    }
  };

  const estadoGlobal = {
    backupOpcoesFiltroColuna,
    coluna,
    colunaOrdenar,
    nome,
    filtrosAplicados,
    opcoesFiltroColuna,
    opcoesFiltroComparacao,
    operador,
    planetas,
    titulosColunas,
    valor,
    aplicaFiltro,
    ordenaPlanetas,
    recebeOpcaoSelecionada,
    recebeTextoDigitado,
    removeFiltro,
    removeTodosFiltros,
    setRadioClicado,
  };

  return (
    <ContextPlanetas.Provider value={ estadoGlobal }>
      {children}
    </ContextPlanetas.Provider>
  );
}

ProviderPlanetas.propTypes = {
  children: PropTypes.node.isRequired,
};
