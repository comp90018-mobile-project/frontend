import { getAuth } from 'firebase/auth';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import firebaseConfig from '../../../authBase';

import ChatRoom from '../../components/chatRoom';
function ChatList({ navigation }) {

  const auth = getAuth(firebaseConfig);

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
      {fakeData.map((item) => (
        <TouchableOpacity onPress={()=>handleChat(item.eventName)} style={styles.button} key={item.id}>
            <ChatRoom id={item.id} eventName={item.eventName} num={item.num}/>
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
