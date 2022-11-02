/* eslint-disable react/jsx-filename-extension */
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { useDispatch } from 'react-redux';
import firebaseConfig from '../../../authBase';

import { fetchEvents, fetchUser } from '../../services/api';

function HomeScreen({ navigation }) {
  const auth = getAuth(firebaseConfig);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  // sign out
  const handleSignOut = () => {
    console.log(`Signed out!${auth.currentUser?.email}`);
    auth
      .signOut()
      .then(() => {
        navigation.replace('Demo');
      })
      .catch((error) => alert(error.message));
  };
  // navigate to chat list page
  const handleChat = () => {
    navigation.navigate('ChatList');
  };
  // navigate to map page
  const handleMap = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={styles.container}>
      <Text>
        Email:
        {auth.currentUser?.email}
        Logged in with:

      </Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleChat}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Chat room</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleMap}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Map</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { navigation.navigate('EventPage'); }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          dispatch(fetchEvents());
        }}
        style={styles.button}
      >
        <Text>fetch events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
        }}
        style={styles.button}
      >
        <Text>console events</Text>
      </TouchableOpacity>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
