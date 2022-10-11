import { getAuth } from 'firebase/auth';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import firebaseConfig from '../../../authBase';

import ChatRoom from '../../components/chatRoom';
import {fetchEvents} from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';


function ChatList({ navigation }) {

  const auth = getAuth(firebaseConfig);
  const {events} = useSelector((state) => state.event);
  const handleChat = (id) => {
    navigation.navigate('Chat', { id: id});
  }

  const fakeData = [{id: '123', eventName: 'chats',num:"3"}, {id: '456', eventName: 'Play',num:"2"}];

  return (
    <View style={styles.container}>
      <Text>
        Email:
        {auth.currentUser?.email}
      </Text>
      {events.map((item) => (
        <TouchableOpacity onPress={()=>handleChat(item._id)} style={styles.button} key={item._id}>
            <ChatRoom id={item._id} eventName={item.name} num={item.participants
      }/>
        </TouchableOpacity>
        ))}
      {/* <TouchableOpacity
        onPress={handleChat}
        style={styles.button}
      >
      <ChatRoom id={"123"} eventName={"chats"} num={"11"}/>
      </TouchableOpacity> */}
    </View>
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
