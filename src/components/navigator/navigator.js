/* eslint-disable react/jsx-filename-extension */
import { getStateFromPath, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './navigatorStyles';
import Map from '../../pages/Map/map';
import ChatList from '../../pages/chatList/index';

const Stack = createNativeStackNavigator();
function Navigator(navigation) {

  return (
    // <Stack.Navigator
    //   initialRouteName={Map}
    //   screenOptions={({route}) => {
    //     navBarIcon: ({focus, color, size}) => {
    //       let icon
    //       if (route.name === Map) {
    //         icon = focus? 'fas fa-map-marked-alt':'far fa-map-marked-alt';
    //       } else if (route.name === ChatList) {
    //         icon = focus? 'fas fa-comments-alt':'fal fa-comments-alt';
    //       }
    //       // return <FontAwesome5 name={icon} size={size}/>
    //     }
    //   }}
    //   >
    //   <Stack.Screen name='map' component={Map}/>
    //   <Stack.Screen name='chatlist' component={ChatList}/>


    //   </Stack.Navigator>


    <View style={styles.navigatorContainer}>
      <TouchableOpacity>
        <Entypo name="chat" size={40} style={styles.chatIcon} />
      </TouchableOpacity>
      <View style={styles.mapIconContainer}>
        <FontAwesome5 name="map-marker-alt" size={50} style={styles.mapIcon} />
      </View>
      <FontAwesome5 name="user-alt" size={40} style={styles.profileIcon} />
    </View>
  );
}

export default Navigator;
