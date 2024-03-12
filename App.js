import 'react-native-gesture-handler';
import Auth from './Screens/Auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from './Screens/Context/AppContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Auth />
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
