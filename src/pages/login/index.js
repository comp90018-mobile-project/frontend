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
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >

      <Text style={styles.title}>Login</Text>


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
          >
          <Text style={styles.forgotPassword}>Go Back</Text>
        </TouchableOpacity>
      </View>

      
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({

  title: {
      position: 'absolute',
      width: 154,
      height: 68,
      left: 143,
      top: 180,

      fontWeight: 'bold',
      fontSize: 56,

      color: '#E04D3D',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323C47',
    
  },
  inputContainer: {
    width: '70%',
      marginBottom: 50,
  },
  input: {

      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 20,
      borderRadius: 15,
  },
  inputText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 31,
    fontStyle: 'normal',
    marginTop: 50,
  },

  buttonContainer: {
      position: 'absolute',
      height: 65,
      width: 300,
      left: 64,
      top: 560,

  },
  button: {
    backgroundColor: '#E04D3D',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 64,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#198F94',
    borderWidth: 2,
  },
  buttonText: {
      height: 31,
      left: 5,
      color: 'white',
      fontWeight: '700',
      fontSize: 26,
  },

});