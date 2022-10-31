import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Appbar, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import firebaseConfig from '../../../authBase';
import { fetchUser } from '../../services/api';

function Chat({ navigation,route}) {
  const dispatch = useDispatch();
    const { event } = route.params;
    console.log('event:',event)
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
      <><>
        <Appbar.Header style={{backgroundColor: "white"}}>
          <Appbar.BackAction onPress={() => { navigation.navigate('ChatList') } } />
          <Text style={styles.buttonText} onPress={() => navigation.navigate('EventDisplay',{event})}>{event.name}</Text>
        </Appbar.Header>
        <Divider />
      </><View style={styles.container}>
          <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            renderUsernameOnMessage={true}
            onSend={messages => onSend(messages)}
            user={{
              _id: auth.currentUser?.email,
              name: username,
              avatar: avatar,
            }} />
        </View></>
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
      color: 'black',
      fontWeight: '700',
      fontSize: 16,
    },
  });
export default Chat;
