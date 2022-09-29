import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet
} from 'react-native';
import { Provider } from 'react-redux';
import demo from './src/pages/demo';
import home from './src/pages/home';
import login from './src/pages/login';
import { store } from './src/store';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
