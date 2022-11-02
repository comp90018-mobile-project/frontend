import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity
} from 'react-native';

const loginButton = (props) => (
  <TouchableOpacity
    onPress={props.onPressFunction}
    style={styles.button}
  >
    <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default loginButton;
