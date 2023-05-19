import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configuredStore from './store';
import './index.css';
import App from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={configuredStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
