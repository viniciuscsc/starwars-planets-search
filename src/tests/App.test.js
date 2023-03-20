import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testes do Projeto Star Wars Planets Search', () => {
  it('O título do projeto é renderizado', async () => {
    render(<App />);
    const tituloProjeto = await screen.getByRole('heading', {level: 1});
    expect(tituloProjeto).toBeInTheDocument();
  });
});
