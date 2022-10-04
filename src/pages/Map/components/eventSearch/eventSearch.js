import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './eventSearchStyles';

function EventSearch() {
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('DestinationSearch');
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <View>
      {/*  Input Box */}
      <Pressable onPress={goToSearch} style={styles.inputBox}>
        <Text style={styles.inputText}>Which Event?</Text>

      </Pressable>

      {/* Previous Search */}
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name="clockcircle" size={20} color="#ffffff" />
        </View>
        <Text style={styles.destinationText}>Spin Nightclub</Text>
      </View>

    </View>
  );
}

export default EventSearch;
