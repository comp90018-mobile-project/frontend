import {
  getAuth, onAuthStateChanged
} from 'firebase/auth';
import { React } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { useDispatch } from 'react-redux';
import firebaseConfig from '../../../authBase';
import { fetchUser } from '../../services/api';

function RtkQueryPage({ navigation }) {
  const dispatch = useDispatch();
  const auth = getAuth(firebaseConfig);
  // auto login
  // const autoLogin = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(fetchUser(user.email));
  //       navigation.replace('Map');
  //     } else {
  //       navigation.replace('Login');
  //     }
  //   });
  // };

  return (
    <View style={styles.containter}>

      <Image style={{}} source={require('../../../assets/titleIMG.png')} />

      <View style={{ marginTop: 100, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.replace('Login')}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => { navigation.replace('Register'); }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#323C47',
  },
  loginButton: {
    width: '70%',
    height: 65,
    backgroundColor: '#E04D3D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signupButton: {
    width: '70%',
    height: 65,
    backgroundColor: '#198F94',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default RtkQueryPage;
