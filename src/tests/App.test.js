import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import ProviderPlanetas from '../context/ProviderPlanetas';
import userEvent from '@testing-library/user-event';
import retornoAPIStarWars from './data';

describe('Testes do Projeto Star Wars Planets Search', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(retornoAPIStarWars),
    });

    render(
      <ProviderPlanetas>
        <App />
      </ProviderPlanetas>
    );
  });

  it('Renderiza o título do projeto', async () => {
    const tituloProjeto = await screen.findByRole('heading', {level: 1});
    expect(tituloProjeto).toBeInTheDocument();
  });

  it('Renderiza o input de filtro por nome', async () => {
    const inputNome = await screen.findByTestId('name-filter');
    expect(inputNome).toBeInTheDocument();
  });

  it('Renderiza as tags select para filtro numérico', async () => {
    const filtroColuna = await screen.findByTestId('column-filter');
    expect(filtroColuna).toBeInTheDocument();

    const filtroOperador = await screen.findByTestId('comparison-filter');
    expect(filtroOperador).toBeInTheDocument();
  });

  it('Renderiza o input de valor e o botões "Filtrar" e "Remover filtros"', async () => {
    const filtroValor = await screen.findByTestId('value-filter');
    expect(filtroValor).toBeInTheDocument();

    const btFiltrar = await screen.findByTestId('button-filter');
    expect(btFiltrar).toBeInTheDocument();

    const btRemoverFiltros = await screen.findByTestId('button-remove-filters');
    expect(btRemoverFiltros).toBeInTheDocument();
  });

  it('Renderiza o select, as tags input:radio e o botão ordenação', async () => {
    const ordenacaoColuna = await screen.findByTestId('column-sort');
    expect(ordenacaoColuna).toBeInTheDocument();

    const inputRadioAsc = await screen.findByTestId('column-sort-input-asc');
    expect(inputRadioAsc).toBeInTheDocument();

    const inputRadioDesc = await screen.findByTestId('column-sort-input-desc');
    expect(inputRadioDesc).toBeInTheDocument();

  });

  it('Os valores iniciais das tags input:radio são ASC e DESC', async () => {
    const inputRadioAsc = await screen.findByTestId('column-sort-input-asc');
    expect(inputRadioAsc.value).toBe('ASC');

    const inputRadioDesc = await screen.findByTestId('column-sort-input-desc');
    expect(inputRadioDesc.value).toBe('DESC');
  });
  
  it('Renderiza a tabela de planetas', async () => {
    const tabelaPlanetas = await screen.findByRole('table');
    expect(tabelaPlanetas).toBeInTheDocument();
  });

  it ('Os valores dos campos são alterados com a interação do usuário', async () => {
    const inputNome = await screen.findByTestId('name-filter');
    expect(inputNome.value).toBe('');

    userEvent.type(inputNome ,'Tatooine');
    expect(inputNome.value).toBe('Tatooine');

    const filtroColuna = await screen.findByTestId('column-filter');
    expect(filtroColuna.value).toBe('population');

    userEvent.selectOptions(filtroColuna, 'orbital_period');
    expect(filtroColuna.value).toBe('orbital_period');

    const filtroOperador = await screen.findByTestId('comparison-filter');
    expect(filtroOperador.value).toBe('maior que');

    userEvent.selectOptions(filtroOperador, 'menor que');
    expect(filtroOperador.value).toBe('menor que');

    const filtroValor = await screen.findByTestId('value-filter');
    expect(filtroValor.value).toBe('0');

    userEvent.clear(filtroValor);
    userEvent.type(filtroValor, '1000')
    expect(filtroValor.value).toBe('1000');
  });

  it('Ao realizar apenas um filtro qualquer, renderiza 4 botões', async () => {
    const btFiltrar = await screen.findByTestId('button-filter');
    userEvent.click(btFiltrar);

    const botoes = await screen.findAllByRole('button');
    expect(botoes.length).toBe(4);
  });

  it('Inicialmente renderiza uma tabela com 10 planetas', async () => {
    const planetas = await screen.findAllByTestId('planet-name');
    expect(planetas.length).toBe(10);
  });

  it('É realizada uma chamada à API logo ao iniciar a página', () => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });

  it('Naboo não é renderizado com o filtro diameter < 12000', async () => {
    const planetaNaboo = await screen.findByRole('cell', { name: /naboo/i });
    expect(planetaNaboo).toBeInTheDocument();

    const filtroColuna = await screen.findByTestId('column-filter');
    userEvent.selectOptions(filtroColuna, 'diameter');

    const filtroOperador = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(filtroOperador, 'menor que');

    const filtroValor = await screen.findByTestId('value-filter');
    userEvent.clear(filtroValor);
    userEvent.type(filtroValor, '12000')

    const btFiltrar = await screen.findByTestId('button-filter');
    userEvent.click(btFiltrar);

    expect(planetaNaboo).not.toBeInTheDocument();
  });

  it('Kamino é renderizado com o filtro rotation_period > 24', async () => {
    const planetaKamino = await screen.findByRole('cell', { name: /kamino/i });
    expect(planetaKamino).toBeInTheDocument();

    const filtroColuna = await screen.findByTestId('column-filter');
    userEvent.selectOptions(filtroColuna, 'rotation_period');

    const filtroOperador = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(filtroOperador, 'maior que');

    const filtroValor = await screen.findByTestId('value-filter');
    userEvent.clear(filtroValor);
    userEvent.type(filtroValor, '24')

    const btFiltrar = await screen.findByTestId('button-filter');
    userEvent.click(btFiltrar);

    expect(planetaKamino).toBeInTheDocument();
  });

  it('Hoth é renderizado com o filtro orbital_period = 549', async () => {
    const planetaHoth = await screen.findByRole('cell', { name: /hoth/i });
    expect(planetaHoth).toBeInTheDocument();

    const filtroColuna = await screen.findByTestId('column-filter');
    userEvent.selectOptions(filtroColuna, 'orbital_period');

    const filtroOperador = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(filtroOperador, 'igual a');

    const filtroValor = await screen.findByTestId('value-filter');
    userEvent.clear(filtroValor);
    userEvent.type(filtroValor, '549')

    const btFiltrar = await screen.findByTestId('button-filter');
    userEvent.click(btFiltrar);

    expect(planetaHoth).toBeInTheDocument();
  });

  it('Alderaan é renderizado ao digitar "aa" no filtro de nome', async () => {
    const inputNome = await screen.findByTestId('name-filter');
    userEvent.type(inputNome, 'aa');

    const planetaAlderaan = await screen.findByRole('cell', { name: /alderaan/i });
    expect(planetaAlderaan).toBeInTheDocument();
  });

  it('Coruscant é o 1º planeta com ordenação descendente de population', async () => {
    const ordenacaoColuna = await screen.findByTestId('column-sort');
    userEvent.selectOptions(ordenacaoColuna, 'population');

    const inputRadioDesc = await screen.findByTestId('column-sort-input-desc');
    userEvent.click(inputRadioDesc);

    const btOrdenar = await screen.findByTestId('column-sort-button');
    userEvent.click(btOrdenar);

    const linhasTabela = await screen.findAllByRole('row');
    const primeiraLinha = linhasTabela[1];
    expect(primeiraLinha.firstChild.innerHTML).toContain('Coruscant');

  });
});
