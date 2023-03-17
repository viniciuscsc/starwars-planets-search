import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ContextPlanetas from './ContextPlanetas';

export default function ProviderPlanetas({ children }) {
  const [planetas, setPlanetas] = useState([]);
  const [titulosColunas, setTitulosColunas] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');

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

  const capturaValorFiltroNome = ({ target: { value } }) => {
    const nomeDigitado = value;
    setFiltroNome(nomeDigitado);
  };

  const estadoGlobal = {
    filtroNome,
    planetas,
    titulosColunas,
    capturaValorFiltroNome,
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
