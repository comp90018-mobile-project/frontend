import { getAuth } from 'firebase/auth';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import firebaseConfig from '../../../authBase';
import ChatComponent from '../../components/chat';

function HomeScreen({ navigation }) {
  const auth = getAuth(firebaseConfig);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };
  const handleChat = () => {
    navigation.navigate('Chat');
  }

  const handleMap = () => {
    navigation.navigate('Map');
  }

  return (
    <View style={styles.container}>
      <Text>
        Email:
        {auth.currentUser?.email}
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

      <ChatComponent />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
