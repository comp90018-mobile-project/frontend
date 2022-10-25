/* eslint-disable react/jsx-filename-extension */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './navigatorStyles';

const Stack = createNativeStackNavigator();
function Navigator({ navigation }) {
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
        <Entypo name="chat" size={40} style={styles.chatIcon} onPress={() => navigation.navigate('ChatList')} />
      </TouchableOpacity>
      <View style={styles.mapIconContainer}>
        <FontAwesome5 name="map-marker-alt" size={50} style={styles.mapIcon} />
      </View>
      <FontAwesome5 name="user-alt" size={40} style={styles.profileIcon} />
    </View>
  );
}

export default Navigator;
