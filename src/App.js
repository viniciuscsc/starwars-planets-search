import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <>
      <h1>Star Wars Planets</h1>
      <PlanetProvider>
        <Table />
      </PlanetProvider>
    </>
  );
}

export default App;
