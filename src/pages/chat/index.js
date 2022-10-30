import React , { useState, useCallback, useEffect, useLayoutEffect }from 'react';
import { StyleSheet,  Button,Text, View, TextInput, SafeAreaView,TouchableOpacity} from 'react-native';
import { getAuth } from 'firebase/auth';
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,onSnapshot, query,orderBy} from 'firebase/firestore';
import firebaseConfig from '../../../authBase';
import { GiftedChat } from 'react-native-gifted-chat';
import { initializeApp } from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../services/api';
import { ConsoleLogger } from '@aws-amplify/core';

function Chat({ navigation,route}) {
  const dispatch = useDispatch();
    const { event } = route.params;
    const id = event._id
    const auth = getAuth(firebaseConfig);

    const db = getFirestore(firebaseConfig);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      dispatch(fetchUser(auth.currentUser?.email));
    }, [])
    const {u, p, username, avatar} = useSelector(state => state.user);
    // console.log("nickname and avatar:", nickname, avatar);

    useLayoutEffect(() => {
        const dataCollection = collection(db,id)
        const q = query(dataCollection,orderBy('createdAt','desc'));

        const unsubscribe = onSnapshot(q,querySnapshot=>{
            setMessages(
                querySnapshot.docs.map(doc=>({
                    _id: doc.id,
                    createdAt:doc.data().createdAt.toDate(),
                    text:doc.data().text,
                    user:doc.data().user,
                }))
            )
            return unsubscribe;

        })

    }, [])

    const onSend = useCallback((messages = []) => {

      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const{
        _id,
        createdAt,
        text,
        user,
      } = messages[0]

        addDoc(collection(db, id), {
            _id,
            createdAt,
            text,
            user,
        });
    }, [])

    return (
      <View style={styles.container}>
        {/* <Text>{id}</Text>
        <Text>nickname and avatar:{nickname} {avatar}</Text> */}
        {console.log(event)}
        <TouchableOpacity
        onPress={() => navigation.navigate('EventDisplay',{event})}
        style={styles.button}
        >
          <Text style={styles.buttonText}>Go to event</Text>
       </TouchableOpacity>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          renderUsernameOnMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth.currentUser?.email,
            name:username,
            avatar: avatar,
          }}
      />
      </View>
    );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      marginLeft:'20%'
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  });
export default Chat;
