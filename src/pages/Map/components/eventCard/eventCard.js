/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './eventCardStyles';

function EventCard({ show, eventInfo, navigation}) {
  console.log('eventInfo', eventInfo);
  return (
    <View style={styles.root}>
      { show && (
      <View style={styles.popupContainer}>
        <Text style={styles.eventName} onPress={() => navigation.navigate('EventDisplay2', { event: eventInfo })} >
          {eventInfo.name}
        </Text>

        <View style={styles.row}>
          {eventInfo.active == 'pending' ? (
            <>
              <Image 
              style={{width: 20, height: 20, left: 30,}} 
              source={require('../../../../../assets/wait.png')}
              />
              <Text style={styles.stateText}>Awaiting</Text>
              <Text style={styles.placementText}>
                {eventInfo.participants.length}
                /
                {eventInfo.settings.max_participant}
              </Text>
            </>
          ):(
            <>
              <Image 
              style={{width: 20, height: 20, left: 30,}} 
              source={require('../../../../../assets/start.png')}
              />
              <Text style={styles.stateText1}>Started</Text>
              <Text style={styles.placementText1}>
                {eventInfo.participants.length}
                /
                {eventInfo.settings.max_participant}
              </Text>
            </>
          )}

          {/* {(eventInfo.participants.length < eventInfo.settings.max_participant)
          && <Text style={styles.stateText}>Awaiting</Text>}
          <Text style={styles.placementText}>
            {eventInfo.participants.length}
            /
            {eventInfo.settings.max_participant}
          </Text> */}
        </View>

      </View>
      )}
    </View>
  );
}

export default EventCard;
