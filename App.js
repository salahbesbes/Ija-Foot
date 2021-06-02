import React from 'react';
import RootNavigator from "./navigation/RootNavigator";
import AppStateProvider from './stateProvider';


const App = () => {
  return (
    <AppStateProvider>
      <RootNavigator/>
    </AppStateProvider>
      
  );
};

export default App;
