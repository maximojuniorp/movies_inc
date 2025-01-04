import AppNavigationContainer from './app/AppNavigationContainer';
import AppContextProvider from './app/contexts/AppContext';
import GlobalLoadingIndicator from './app/components/GlobalLoadingIndicator';

export default function App() {
  return (
    <AppContextProvider>
      <GlobalLoadingIndicator/>
      <AppNavigationContainer />
    </AppContextProvider>)
}

