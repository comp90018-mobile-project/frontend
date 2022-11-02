/* eslint-disable react/jsx-filename-extension */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
function Navigator({ navigation }) {
  return (
    <View style={styles.navigatorContainer}>
      <TouchableOpacity style={styles.btnItem}>
        <Entypo name="chat" size={40} style={styles.chatIcon} onPress={() => navigation.navigate('ChatList')} />
        <Text style={{ color: '#fff', marginTop: 7, fontWeight: 'bold' }}>Chat</Text>
      </TouchableOpacity>
      <View style={styles.btnItem}>
        <FontAwesome5 name="map-marker-alt" size={40} style={styles.mapIcon} onPress={() => navigation.navigate('Map')} />
        <Text style={{ color: '#fff', marginTop: 7, fontWeight: 'bold' }}>Map</Text>
      </View>
      <View style={styles.btnItem}>
        <FontAwesome5 name="user-alt" size={40} style={styles.profileIcon} onPress={() => navigation.navigate('Profile')} />
        <Text style={{ color: '#fff', marginTop: 7, fontWeight: 'bold' }}>Profile</Text>
      </View>
    </View>
  );
}

// create styles
const styles = StyleSheet.create({
  navigatorContainer: {
    position: 'absolute',
    width: '100%',
    height: '11%',
    bottom: 0,
    backgroundColor: '#323C47',
    flexDirection: 'row',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    borderBottomWidth: 1,
  },
  btnItem: {
    alignItems: 'center',
  },
  mapIcon: {
    color: '#94E858',
  },
  profileIcon: {
    color: '#94E858',
  },
  chatIcon: {
    color: '#94E858',
  },
});

export default Navigator;
