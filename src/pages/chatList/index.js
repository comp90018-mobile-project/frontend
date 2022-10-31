import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import firebaseConfig from '../../../authBase';
import ChatRoom from '../../components/chatRoom';
import Navigator from '../../components/navigator/navigator';
import { fetchEvents } from '../../services/api';

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

  const [event, setEvent] = React.useState(events);
  const handleSearch = (text) => {
    const filteredEvents = events.filter((event) => event.name.includes(text));
    // eslint-disable-next-line no-unused-expressions
    (text.length && filteredEvents.length) ? setEvent(filteredEvents) : setEvent(events);
  }

  

  return (
    <>
    <Searchbar
          style={{ top: 50 }}
          placeholder="Search"
          onChangeText={(text) => handleSearch(text)}
    />
    <Divider />
      <ScrollView style={{ backgroundColor: 'white', top: 50}}>
        <View style={styles.container}>

          {event.map((item) => (

            item.preview != '' ?
              <TouchableOpacity onPress={() => handleChat(item)} style={styles.button} key={item._id}>
                <ChatRoom id={item._id} eventName={item.name} num={item.participants.length} image={item.preview} theme={item.settings.type} />
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => handleChat(item)} style={styles.button} key={item._id}>
                <ChatRoom id={item._id} eventName={item.name} num={item.participants} image={''} theme={item.settings.type} />
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
    <Navigator navigation={navigation} />
    </>
  );
}

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: '98%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
