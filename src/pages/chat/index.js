import React , { useState, useCallback, useEffect, useLayoutEffect }from 'react';
import { StyleSheet,  Button,Text, View, TextInput, SafeAreaView} from 'react-native';
import { getAuth } from 'firebase/auth';
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,onSnapshot, query,orderBy} from 'firebase/firestore';
import firebaseConfig from '../../../authBase';
import { GiftedChat } from 'react-native-gifted-chat';
import { initializeApp } from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../services/api';

function Chat({ navigation }) {
  const dispatch = useDispatch();
  
    const auth = getAuth(firebaseConfig);

    const db = getFirestore(firebaseConfig);
    const [isTyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      dispatch(fetchUser(auth.currentUser?.email));
    })
    const {u, p, nickname, avatar} = useSelector(state => state.user);
    console.log("nickname and avatar:", nickname, avatar);
    useLayoutEffect(() => {
        const dataCollection = collection(db,"chats")
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
      
        addDoc(collection(db, "chats"), {
            _id,
            createdAt,
            text,
            user,
        });
    }, [])
  
    return (
      <View style={styles.container}>
        
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage
          
          onSend={messages => onSend(messages)}
          user={{
            _id: auth.currentUser?.email,

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
  });
export default Chat;
