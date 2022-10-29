import {React, useEffect} from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// import { userApi } from '../../services/user';
import {
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import firebaseConfig from '../../../authBase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../services/api';

function RtkQueryPage({ navigation }) {
  const dispatch = useDispatch();
  const auth = getAuth(firebaseConfig);


  const autoLogin = () => {

      onAuthStateChanged(auth, (user) => {
        // 判断用户是否已经登录
        if (user) {
          // 发起请求，拿profile
          dispatch(fetchUser(user.email));
          // 先拿再跳
          navigation.replace('Map');
        } else {
          navigation.replace('Login');
        }
      });
  };



  return (
    <View style = {styles.containter}>

      <Image style={{}} source={require('../../../assets/titleIMG.png') } />

      <View style={{marginTop: 100, width: '100%', alignItems: 'center'}}>
        <TouchableOpacity style={styles.loginButton} onPress = {autoLogin}>
          <Text style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress = {() => {navigation.replace('Register');}}
          >
        <Text style = {styles.buttonText}>Sign Up</Text>
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
    marginBottom: 30
  },
  signupButton: {
    width: '70%',
    height: 65,
    backgroundColor: '#198F94',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default RtkQueryPage;
