import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { fetchEvents } from '../../services/api';
import firebaseConfig from '../../../authBase';

import ChatRoom from '../../components/chatRoom';

function ChatList({ navigation }) {
  const auth = getAuth(firebaseConfig);
  const { events } = useSelector((state) => state.event);
  const handleChat = (event) => {
    navigation.navigate('Chat', { event });
  };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchEvents());
    console.log('events:',events)
  },[])

  

  return (
    <ScrollView style={{ backgroundColor: '#323c47' }}>
      <View style={styles.container}>
        
        {events.map((item) => (
          
          item.preview !=''? 
          <TouchableOpacity onPress={()=>handleChat(item)} style={styles.button} key={item._id}>
            <ChatRoom id={item._id} eventName={item.name} num={item.participants.length} image={item.preview} theme={item.settings.type}/>
          </TouchableOpacity>:
          <TouchableOpacity onPress={()=>handleChat(item)} style={styles.button} key={item._id}>
            <ChatRoom id={item._id} eventName={item.name} num={item.participants} image={''} theme={item.settings.type}/>
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
