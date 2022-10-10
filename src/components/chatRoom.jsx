

import { useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,Image
} from 'react-native';
import { idText } from 'typescript';
export default function ChatRoom(props) {
  const {id,eventName,num} = props
  return (
    <View  style={styles.container}>
      <View style={{width:"20%"}}>
        <Image style={styles.tinyLogo} 
          source={{uri:"https://talkjs.com/images/avatar-1.jpg"}}
        />
      </View>
      <View style={{width:"80%"}}>
        <Text style={styles.buttonText} >{eventName}</Text>
        <Text>{num} participants</Text> 
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      display:'flex',
      flexDirection:"row",
      flexWrap: "nowrap",
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
      marginBottom: 8,
      
    },
    tinyLogo: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
})
