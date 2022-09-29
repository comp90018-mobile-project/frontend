import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { userApi } from '../../services/user';

function RtkQueryPage({ navigation }) {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = userApi.endpoints.usersGet.useQuery();

  return (
    <View style = {stycles.Containter}>

      <View style = {stycles.IMGContainer}>
        <Image source={require('../../../assets/titleIMG.png') } />
      </View>

      <View>
        <TouchableOpacity style={stycles.button01}>
          <Text style = {stycles.textStycle}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stycles.button02}>
        <Text >Sign Up</Text>
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
    width: 300,
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


  textStycle: {
    "position": "absolute",
    "width": 229,
    "height": 34,
    "left": 115,
    "top": 17,


  }
});

export default RtkQueryPage;
