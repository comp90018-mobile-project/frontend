import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import firebaseConfig from '../../../authBase';


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebaseConfig);


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.replace('Home');
        console.log('Logged in with:', user.email);
      })
      .catch((error) => alert(error.message));
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <View style={styles.title}>
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Username</Text>
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
          onPress = {() => navigation.replace('Demo')}
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
    flex: 1,
    backgroundColor: '#323C47',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 56,
    color: '#E04D3D'
  },
  inputContainer: {
    width: '70%',
    marginBottom: 50
  },
  inputText: {
    color: '#fff',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 26,
    lineHeight: 26,
    marginTop: 45,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10
  },
  buttonContainer: {
    width: '50%',
    height: 'auto'
  },
  button: {
    backgroundColor: '#E04D3D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 26
  }
});