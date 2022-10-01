import React , { useState, useCallback, useEffect }from 'react';
import { StyleSheet,  Button,Text, View, TextInput, SafeAreaView} from 'react-native';
import { getAuth } from 'firebase/auth';
// import {db} from 'firebase/database';
import firebaseConfig from '../../../authBase';
import { GiftedChat } from 'react-native-gifted-chat';

function Chat({ navigation }) {
    const auth = getAuth(firebaseConfig);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer2',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          }, 
        }
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
        
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      console.log(messages)
      const{
        _id,
        createdAt,
        text,
        user,
      } = messages[0]
      // db.collection('chats').add({
      //   _id,
      //   createdAt,
      //   text,
      //   user,
      // })
    }, [])
  
    return (
      <View style={styles.container}>
        <Button
        title="Go home page"
        onPress={() => navigation.navigate('Home')}
        />

        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth.currentUser?.email,
            name: auth.currentUser?.email,
          }}
      />
      {console.log(messages)}
      </View>
    );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
    },
  });
export default Chat;
