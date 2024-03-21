/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AppProvider } from './Screens/Context/AppContext';

const Main = () => (
    <AppProvider>
      <App />
    </AppProvider>
  );

AppRegistry.registerComponent(appName, () => Main);
