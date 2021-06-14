import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import AppStateProvider from './stateProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  return (
    <AppStateProvider>
      <PaperProvider
        theme={theme}
        settings={{
          icon: props => <MaterialIcons {...props} />,
        }}>
        <RootNavigator />
      </PaperProvider>
    </AppStateProvider>
  );
};

export default App;
