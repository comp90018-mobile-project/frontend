import { getAuth } from 'firebase/auth';
import React, { useCallback, useEffect } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import firebaseConfig from '../../../authBase';
import ChatRoom from '../../components/chatRoom';
import Navigator from '../../components/navigator/navigator';
import { fetchEvents } from '../../services/api';

function ChatList({ navigation }) {
  const auth = getAuth(firebaseConfig);
  const event_ = useSelector((state) => state.event);
  const { events } = useSelector((state) => state.event);
  // navigate to chat room
  const handleChat = (event) => {
    navigation.navigate('Chat', { event });
  };
  const dispatch = useDispatch();
  // fetch events data
  const func = useCallback(() => { dispatch(fetchEvents()); }, [event_]);
  useEffect(func, []);

  const [event, setEvent] = React.useState(events);
  // search function
  const handleSearch = (text) => {
    const filteredEvents = events.filter((event) => event.name.includes(text));
    (text.length && filteredEvents.length) ? setEvent(filteredEvents) : setEvent(events);
  };

  return (
    <>
      <Searchbar
        style={{ top: 50 }}
        placeholder="Search"
        onChangeText={(text) => handleSearch(text)}
      />
      <Divider />
      <ScrollView style={{ backgroundColor: 'white', top: 50, marginBottom: 140 }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.headerText1}>Started Events</Text>
            <Divider style={{ width: 380 }} />
          </View>

          {event.map((item) => (
            item.active == 'started' && (item.preview != ''
              ? (
                <TouchableOpacity onPress={() => handleChat(item)} style={styles.button} key={item._id}>
                  <ChatRoom id={item._id} eventName={item.name} num={item.participants.length} image={item.preview} theme={item.settings.type} />
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity onPress={() => handleChat(item)} style={styles.button} key={item._id}>
                  <ChatRoom id={item._id} eventName={item.name} num={item.participants} image="" theme={item.settings.type} />
                </TouchableOpacity>
              ))
          ))}

          <View>
            <Text style={styles.headerText2}>Pending Events</Text>
            <Divider style={{ width: 380 }} />
          </View>

          {event.map((item) => (
            item.active == 'pending' && (item.preview != ''
              ? (
                <TouchableOpacity onPress={() => handleChat(item)} style={styles.button} key={item._id}>
                  <ChatRoom id={item._id} eventName={item.name} num={item.participants.length} image={item.preview} theme={item.settings.type} />
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity onPress={() => handleChat(item)} style={styles.button} key={item._id}>
                  <ChatRoom id={item._id} eventName={item.name} num={item.participants} image="" theme={item.settings.type} />
                </TouchableOpacity>
              ))
          ))}
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
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  headerText1: {
    color: 'grey',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  headerText2: {
    color: 'grey',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});
