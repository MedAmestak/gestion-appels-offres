import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Make sure the import path is correct
import { UserProvider } from './contexts/UserContext'; // Make sure the import path is correct
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>,
    rootElement
  );
} else {
  console.error("Root element 'root' not found.");
}
