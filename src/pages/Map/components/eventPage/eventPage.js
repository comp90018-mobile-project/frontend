/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Image, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './eventPageStyles';

function EventPage() {
  return (
    <View style={styles.root}>
      <View style={styles.headContainer}>
        <MaterialCommunityIcons name="file-image-plus-outline" style={styles.eventImage} size={95} />
        <Text style={styles.eventName}>Event Name</Text>
      </View>

      <View style={styles.participantsContainer}>
        <Image
          style={{
            width: 35, height: 35, top: 8, left: 15, borderRadius: 20,
          }}
          source={require('../../../../../assets/avatar.png')}
        />
        <Ionicons
          name="person-add"
          style={{
            width: 35, height: 30, top: 8, left: 25,
          }}
          size={30}
        />

      </View>

      <View style={styles.settings} />

      <View style={styles.images}>
        <Image
          style={{
            width: '100%', height: '100%', borderRadius: 15,
          }}
          source={require('../../../../../assets/location.png')}
        />
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Create Event</Text>
      </View>

    </View>
  );
}

export default EventPage;
