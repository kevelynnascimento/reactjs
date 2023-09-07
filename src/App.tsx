import React from 'react';
import { AuthProvider } from './contexts/Auth';
import Routes from './routes';
import DefaultTheme from './components/DefaultTheme';

const App = () => {
  return (
    <DefaultTheme>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </DefaultTheme>
  );
};

export default App;
