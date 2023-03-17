import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ContextPlanetas from './ContextPlanetas';

export default function ProviderPlanetas({ children }) {
  const [planetas, setPlanetas] = useState([]);
  const [titulosColunas, setTitulosColunas] = useState([]);

  const [nome, setNome] = useState('');
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [valor, setValor] = useState(0);

  const [opcoesFiltroColuna, setOpcoesFiltroColuna] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const opcoesFiltroComparacao = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const buscaPlanetas = async () => {
    const URL = 'https://swapi.dev/api/planets';

    const resposta = await fetch(URL);
    const dados = await resposta.json();
    const planetasAPI = dados.results;

    planetasAPI.filter((planeta) => delete planeta.residents);
    setPlanetas(planetasAPI);

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
  };

  const aplicaNovoFiltro = (listaPlanetas) => {
    const novaListaPlanetas = listaPlanetas.filter((planeta) => {
      if (operador === 'maior que') return Number(planeta[coluna]) > Number(valor);
      if (operador === 'menor que') return Number(planeta[coluna]) < Number(valor);
      return Number(planeta[coluna]) === Number(valor);
    });

    setPlanetas(novaListaPlanetas);
  };

  const estadoGlobal = {
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
    recebeTextoDigitado,
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
