/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './eventPageStyles';

function EventPage() {
  return (
    // <View style={styles.root}>
    //   <View style={styles.headContainer}>
    //     <MaterialCommunityIcons name="file-image-plus-outline" style={styles.eventImage} size={95} />
    //     <Text style={styles.eventName}>Event Name</Text>
    //   </View>

    //   <View style={styles.participantsContainer}>
    //     <Image
    //       style={{
    //         width: 35, height: 35, top: 8, left: 15, borderRadius: 20,
    //       }}
    //       source={require('../../../../../assets/avatar.png')}
    //     />
    //     <Ionicons
    //       name="person-add"
    //       style={{
    //         width: 35, height: 30, top: 8, left: 25,
    //       }}
    //       size={30}
    //     />

    //   </View>

    //   <View style={styles.settings} />

    //   <View style={styles.images}>
    //     <Image
    //       style={{
    //         width: '100%', height: '100%', borderRadius: 15,
    //       }}
    //       source={require('../../../../../assets/location.png')}
    //     />
    //   </View>

    //   <View style={styles.button}>
    //     <Text style={styles.buttonText}>Create Event</Text>
    //   </View>

    // </View>
    <View style={styles.root}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="file-image-plus-outline" style={styles.previewImg} size={95} />
        <View style={styles.headerText}>
          <Text style={{color: '#fff', fontSize: 36, fontWeight: 'bold'}}>Event Name</Text>
          <Text style={{color: '#fff', fontSize: 16}}>Host Name</Text>
        </View>
      </View>

      <View style={styles.participantContainer}>
        <Text style={styles.titleFont}>Participants</Text>
        <View style={styles.participantList}>
          <Image style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}}
                source={require('../../../../../assets/avatar.png')}/>
          <Image style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}}
                source={require('../../../../../assets/avatar.png')}/>
        </View>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.titleFont}>Settings</Text>

        <View style={styles.settingList}>
          <View style={styles.settingItem}>
            <Text>Duration</Text>
            <Text style={styles.settingItemContent}>01:30</Text>
          </View>
          <View style={styles.settingItem}>
            <Text>Max & Min Participants</Text>
            <Text style={styles.settingItemContent}>5 - 7</Text>
          </View>
          <View style={styles.settingItem}>
            <Text>Type</Text>
            <Text style={styles.settingItemContent}>Event Type</Text>
          </View>
          <View style={styles.settingItem}>
            <Text>Description</Text>
            <View><Text>EventEventEventEventEventEvent</Text></View>
          </View>

        </View>
      </View>

      <View style={styles.imgContainer}>
        <Text style={styles.titleFont}>Images</Text>
        <Image style={{width: '100%', height: 200, borderRadius: 15,}}
          source={require('../../../../../assets/location.png')}/>
      </View>

      <TouchableOpacity style={styles.createButton}>
        <Text style={{fontSize: 12, color: "#fff", fontWeight: "bold", alignSelf: "center", textTransform: "uppercase"}}>
          Create
        </Text>
      </TouchableOpacity>

    </View>
  );
}

export default EventPage;
