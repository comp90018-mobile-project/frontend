/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import demo from './src/pages/demo';
import home from './src/pages/home';
import login from './src/pages/login';
import map from './src/pages/Map';
import Chat from './src/pages/chat';
import { store } from './src/store';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ title: 'Chat' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
