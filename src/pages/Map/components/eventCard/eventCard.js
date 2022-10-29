/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './eventCardStyles';

function EventCard({ show, eventInfo }) {
  return (
    <View style={styles.root}>
      { show && (
      <View style={styles.popupContainer}>
        <Text style={styles.eventName}>
          {eventInfo.name}
        </Text>

        <View style={styles.row}>
          <Image
            style={{
              width: 20, height: 20, left: 30,
            }}
            source={require('../../../../../assets/wait.png')}
          />
          {(eventInfo.participants.length < eventInfo.settings.max_participant)
          && <Text style={styles.stateText}>Awaiting</Text>}
          <Text style={styles.placementText}>
            {eventInfo.participants.length}
            /
            {eventInfo.settings.max_participant}
          </Text>
        </View>

      </View>
      )}
    </View>
  );
}

export default EventCard;
