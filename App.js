/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import demo from './src/pages/demo';
import home from './src/pages/home';
import login from './src/pages/login';
import eventPage from './src/pages/Map/components/eventPage/eventPage';
import map from './src/pages/Map/map';
import { store } from './src/store';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EventPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="EventPage"
            component={eventPage}
            options={{ title: 'EventPage' }}
          />
          <Stack.Screen
            name="Map"
            component={map}
            options={{ title: 'Map' }}
          />
          <Stack.Screen
            name="Home"
            component={home}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Login"
            component={login}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Demo"
            component={demo}
            options={{ title: 'Demo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
