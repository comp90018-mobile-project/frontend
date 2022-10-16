/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import demo from './src/pages/demo';
import home from './src/pages/home';
import login from './src/pages/login';
import map from './src/pages/Map';
import register from './src/pages/register';
import Chat from './src/pages/chat';
import ChatList from './src/pages/chatList';
import EventPage from './src/pages/Map/components/eventPage/eventPage';
import { store } from './src/store';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Demo">
          <Stack.Screen
            name="Map"
            component={map}
            options={{ title: 'Map' }}
          />
          <Stack.Screen
            name="Home"
            component={home}
            options={{ title: 'Home', headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="Login"
            component={login}
            options={{ title: 'Login', headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="Demo"
            component={demo}
            options={{ title: 'Demo', headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="Register"
            component={register}
            options={{ title: 'Register', headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ title: 'Chat' }}
          />
          <Stack.Screen
            name="ChatList"
            component={ChatList}
            options={{ title: 'ChatList' }}
          />
          <Stack.Screen
            name="EventPage"
            component={EventPage}
            options={{ title: 'EventPage' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
