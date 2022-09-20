import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './src/pages/login';
import home from './src/pages/home';
import demo from './src/pages/demo';
import { store } from './src/store';
import { Provider } from 'react-redux';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Demo">
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
