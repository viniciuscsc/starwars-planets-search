import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <>
      <h1>Projeto Star Wars</h1>
      <PlanetProvider>
        <Table />
      </PlanetProvider>
    </>
  );
}

export default App;
