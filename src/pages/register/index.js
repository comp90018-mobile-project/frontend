import {
    createUserWithEmailAndPassword, getAuth, onAuthStateChanged
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
  
  function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(firebaseConfig);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate('Home');
        } else {
  
        }
      });
  
      return unsubscribe;
    }, []);
  
    const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const { user } = userCredentials;
          console.log('Registered with:', user.email);
        })
        .catch((error) => alert(error.message));
    };
  

  
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">

            <Text style={styles.title}>Register</Text>


            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
            />
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
                onPress={handleSignUp}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign Up !</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
  }
  
  export default SignUpScreen;
  
  const styles = StyleSheet.create({

    title: {
        position: 'absolute',
        width: 232,
        height: 68,
        left: 98,
        top: 200,

        fontWeight: 'bold',
        fontSize: 56,

        color: '#198F94',
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
      backgroundColor: '#198F94',
      width: '100%',
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
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
  