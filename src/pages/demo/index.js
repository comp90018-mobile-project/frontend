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
  const {u, p} = useSelector(state => state.user);
  const auth = getAuth(firebaseConfig);
  // console.log(u, p);


  const autoLogin = () => {

      onAuthStateChanged(auth, (user) => {
        // 判断用户是否已经登录
        if (user) {
          // 发起请求，拿profile
          dispatch(fetchUser(user.email));
          // 先拿再跳
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      });
  };



  return (
    <View style = {stycles.Containter}>

      <View style = {stycles.IMGContainer}>
        <Image source={require('../../../assets/titleIMG.png') } />
      </View>

      <View>
        <TouchableOpacity
         style={stycles.button01}
         onPress = {autoLogin}
         >
          <Text style = {stycles.textStycleLogIn}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={stycles.button02}
          onPress = {() => {navigation.replace('Register');}}
          >
        <Text style = {stycles.textStycleSignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stycles = StyleSheet.create({
  Containter: {
    position: 'relative',
    width: 428,
    height: 926,
    backgroundColor: '#323C47',
  },
  IMGContainer: {
    position: 'absolute',
    width: 152,
    height: 201,
    left: 138,
    top: 224,

  },

  button01: {
    position: 'absolute',
    width: '70%',
    height: 65,
    left: 64,
    top: 590,

    backgroundColor: '#E04D3D',
    borderRadius: 20,
  },

  button02: {
    position: 'absolute',
    width: 300,
    height: 65,
    left: 64,
    top: 690,

    backgroundColor: '#198F94',
    borderRadius: 20,
  },


  textStycleLogIn: {
    "position": "absolute",
    "left": 125,
    "top": 20,
    color: '#FFFFFF',

    fontWeight: 'bold',
    fontSize: 20,
  },

  textStycleSignUp: {
    "position": "absolute",
    "left": 115,
    "top": 20,
    color: '#FFFFFF',

    fontWeight: 'bold',
    fontSize: 20,
  },


});

export default RtkQueryPage;
