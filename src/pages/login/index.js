import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import firebaseConfig from '../../../authBase';
import { fetchUser } from '../../services/api';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebaseConfig);
  // login function
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        navigation.replace('Map');
        console.log('Logged in with:', user.email);
        dispatch(fetchUser(user.email));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <View style={styles.title}>
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('Demo')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#323C47',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 56,
    color: '#E04D3D',
    marginBottom: 20,
  },
  inputContainer: {
    width: '70%',
    marginBottom: 20,
  },
  inputText: {
    color: '#fff',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '70%',
    height: 65,
    backgroundColor: '#E04D3D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
