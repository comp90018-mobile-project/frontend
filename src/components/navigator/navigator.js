/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './navigatorStyles';

function Navigator() {
  return (
    <View style={styles.navigatorContainer}>
      <Entypo name="chat" size={40} style={styles.chatIcon} />
      <View style={styles.mapIconContainer}>
        <FontAwesome5 name="map-marker-alt" size={50} style={styles.mapIcon} />
      </View>
      <FontAwesome5 name="user-alt" size={40} style={styles.profileIcon} />
    </View>
  );
}

export default Navigator;
