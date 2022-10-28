import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import firebaseConfig from '../../../authBase';

import ChatRoom from '../../components/chatRoom';

function ChatList({ navigation }) {
  const auth = getAuth(firebaseConfig);
  const { events } = useSelector((state) => state.event);
  const handleChat = (id) => {
    navigation.navigate('Chat', { id });
  };


  return (
    <ScrollView style={{ backgroundColor: '#323c47' }}>
      <View style={styles.container}>
        {console.log(events)}
        {events.map((item) => (
          
          item.preview!=''? 
          <TouchableOpacity onPress={()=>handleChat(item._id)} style={styles.button} key={item._id}>
            <ChatRoom id={item._id} eventName={item.name} num={item.participants.length} image={item.preview} theme={item.settings.type}/>
          </TouchableOpacity>:
          <TouchableOpacity onPress={()=>handleChat(item._id)} style={styles.button} key={item._id}>
            <ChatRoom id={item._id} eventName={item.name} num={item.participants.length} image={''} theme={item.settings.type}/>
          </TouchableOpacity>
          ))}
        {/* <TouchableOpacity
          onPress={handleChat}
          style={styles.button}
        >
        <ChatRoom id={"123"} eventName={"chats"} num={"11"}/>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323C47',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#248A59',
    width: '85%',
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
