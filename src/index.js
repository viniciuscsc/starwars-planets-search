import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProviderPlanetas from './context/ProviderPlanetas';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ProviderPlanetas>
      <App />
    </ProviderPlanetas>,
  );
