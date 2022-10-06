import {React, useEffect} from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { userApi } from '../../services/user';
import {
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import firebaseConfig from '../../../authBase';


function RtkQueryPage({ navigation }) {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = userApi.endpoints.usersGet.useQuery();

  const auth = getAuth(firebaseConfig);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Home');
      } else {

      }
    });

    return unsubscribe;
  }, []);



  return (
    <View style = {stycles.Containter}>

      <View style = {stycles.IMGContainer}>
        <Image source={require('../../../assets/titleIMG.png') } />
      </View>

      <View>
        <TouchableOpacity
         style={stycles.button01}
         onPress = {() => {navigation.replace('Login');}}
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
