import { useEffect, useState } from 'react';
import {
  Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Dialog } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelEvent, getUsersAvatar, updateEventActive, updateEventParticipants, updateUserParticipate, updateUserQuitEvent
} from '../../../../services/api';

export default function EventDisplay2({ route, navigation }) {
  const dispatch = useDispatch();
  // get current user info
  const currentUser = useSelector((state) => state.user);
  // get the event to display

  const { event } = route.params;

  console.log('event is: ', event);
  // alter dialogs
  const [quitDialog, setQuitDialog] = useState(false);
  const [joinDialog, setJoinDialog] = useState(false);
  const [startDialog, setStartDialog] = useState(false);
  const [endDialog, setEndDialog] = useState(false);
  const [peopleDialog, setPeopleDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  // location initial region
  const [initialRegion, setInitialRegion] = useState(
    {
      latitude: event.latitude,
      longitude: event.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
  );
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { participants } = event;
      const { data } = await getUsersAvatar(participants.join(','));
      setAvatars(data);
    };
    fetch();
  }, [event]);
  const checkUser = () => {
    if (event.organiser === currentUser.email) {
      return 'host';
    } if (event.participants.find((e) => e === currentUser.email)) {
      return 'participant';
    }
    return 'joinable';
  };
  console.log('user right', checkUser());

  const handleNavigateChat = () => {
    navigation.navigate('Chat', { event });
  };

  const handleJoinEvent = () => {
    if (event.participants.length < event.settings.max_participant && event.active == 'pending') {
    // update event participants[]
      dispatch(updateEventParticipants(
        {
          event_id: event._id,
          participants: [...event.participants].concat(currentUser.email),
        },
      ));
      // update user participate
      dispatch(updateUserParticipate(
        {
          email: currentUser.email,
          participantevent: [event._id],
        },
      ));
      // show success join dialog
      setJoinDialog(true);
    }
  };

  const handleQuitEvent = () => {
    // update event participants[]
    const userToRemove = currentUser.email;
    dispatch(updateEventParticipants(
      {
        event_id: event._id,
        participants: event.participants.filter((item) => item != userToRemove),
      },
    ));
    // clear event_participant in user profile
    dispatch(updateUserQuitEvent(currentUser.email));
    // show quit dialog if success
    setQuitDialog(true);
  };

  const handleStartEvent = () => {
    if (event.participants.length >= event.settings.min_participant) {
      dispatch(updateEventActive(
        {
          event_id: event._id,
          active: 'started',
        },
      ));
      setStartDialog(true);
    } else {
      setPeopleDialog(true);
    }
  };
  // todo
  const handleEndEvent = () => {
    dispatch(updateEventActive(
      {
        event_id: event._id,
        active: 'ended',
      },
    ));
    setEndDialog(true);
  };
  // todo
  const handleCancelEvent = () => {
    dispatch(cancelEvent(event._id));
    setCancelDialog(true);
  };

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity style={{ alignSelf: 'flex-start', left: 10 }} onPress={() => navigation.goBack()}>
        <FontAwesome name="chevron-left" size={25} color="#fff" />
      </TouchableOpacity>
      <ScrollView style={{ width: '100%', paddingTop: 20, height: '95%' }}>
        <View style={styles.columnCentre}>

          <View style={styles.header}>
            {event.preview !== ''
              ? <Image style={styles.previewImg} source={{ uri: event.preview }} />
              : <MaterialCommunityIcons name="file-image-plus-outline" style={styles.previewImg} size={130} />}
            <View style={styles.headerText}>
              <Text style={styles.eventNameFont}>{event.name}</Text>
              <Text style={{ color: '#fff', fontSize: 16 }}>{event.organiser}</Text>
            </View>
          </View>

          <View style={styles.participantContainer}>
            <Text style={styles.titleFont}>Participants</Text>
            <View style={styles.participantList}>
              {avatars.map((avatar, index) => (
                <Image
                  key={index}
                  source={{ uri: avatar }}
                  style={{
                    width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5,
                  }}
                />
              ))}
            </View>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.titleFont}>Event Information</Text>
            <View style={styles.settingList}>

              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Start Time</Text>
                <Text style={styles.settingItemContent}>
                  {`${event.settings.start_time.split('T')[0].slice(5, 10)} / ${
                    event.settings.start_time.split('T')[1].slice(0, 5)}`}
                </Text>
              </View>
              <Divider style={{
                backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10,
              }}
              />

              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Duration</Text>
                <Text style={styles.settingItemContent}>
                  {' '}
                  {event.settings.duration}
                  {' '}
                </Text>
              </View>
              <Divider style={{
                backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10,
              }}
              />

              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Participants</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.settingItemContent}>
                    {' '}
                    {event.settings.min_participant}
                    {' '}
                  </Text>
                  <Text style={{ fontSize: 15 }}> - </Text>
                  <Text style={styles.settingItemContent}>
                    {' '}
                    {event.settings.max_participant}
                    {' '}
                  </Text>
                </View>
              </View>
              <Divider style={{
                backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10,
              }}
              />

              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Type</Text>
                <Text style={styles.settingItemContent}>{event.settings.type}</Text>
              </View>
              <Divider style={{
                backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10,
              }}
              />

              <View style={styles.settingItem}>
                <Text style={styles.settingItem}>Description</Text>
              </View>
              <View>
                <Text style={{ fontSize: 16, color: 'grey' }}>{event.settings.description}</Text>
              </View>

            </View>
          </View>

          <View style={styles.imgContainer}>
            <Text style={styles.titleFont}>Location</Text>
            <MapView
              initialRegion={initialRegion}
              showsUserLocation
              style={{ width: '100%', height: 200, borderRadius: 15 }}
            >
              <Marker coordinate={{ latitude: event.latitude, longitude: event.longitude }}>
                <Image
                  style={{
                    width: 35, height: 35, borderRadius: 20, resizeMode: 'contain',
                  }}
                  source={{ uri: currentUser.avatar !== '' ? currentUser.avatar : undefined }}
                />
              </Marker>
            </MapView>
          </View>

        </View>
      </ScrollView>

      {checkUser() === 'participant'
        ? (
          <>
            {/* participant quit event */}
            <TouchableOpacity style={styles.quitButton} onPress={handleQuitEvent}>
              <Text style={{
                fontSize: 12,
                color: '#fff',
                alignSelf: 'center',
                textTransform: 'uppercase',
              }}
              >
                Quit this event
              </Text>
            </TouchableOpacity>

            {/* participant navigate to chat */}
            <TouchableOpacity style={styles.navChatButton} onPress={handleNavigateChat}>
              <Text style={{
                fontSize: 12,
                color: '#fff',
                alignSelf: 'center',
                textTransform: 'uppercase',
              }}
              >
                Navigate to chat
              </Text>
            </TouchableOpacity>
          </>
        )
        : checkUser() === 'host'
          ? (
            <>
              {/* host start event and cancel event */}
              {event.active === 'pending'
                ? (
                  <>
                    {/* host start event */}
                    <TouchableOpacity style={styles.joinButton} onPress={handleStartEvent}>
                      <Text style={{
                        fontSize: 12,
                        color: '#fff',
                        alignSelf: 'center',
                        textTransform: 'uppercase',
                      }}
                      >
                        Start the event
                      </Text>
                    </TouchableOpacity>
                    {/* host cancel event */}
                    <TouchableOpacity style={styles.quitButton} onPress={handleCancelEvent}>
                      <Text style={{
                        fontSize: 12,
                        color: '#fff',
                        alignSelf: 'center',
                        textTransform: 'uppercase',
                      }}
                      >
                        Cancel the event
                      </Text>
                    </TouchableOpacity>
                  </>
                )
                : (
                  <TouchableOpacity style={styles.quitButton} onPress={handleEndEvent}>
                    <Text style={{
                      fontSize: 12,
                      color: '#fff',
                      alignSelf: 'center',
                      textTransform: 'uppercase',
                    }}
                    >
                      End the event
                    </Text>
                  </TouchableOpacity>
                )}
              {/* host navigate to chat */}
              <TouchableOpacity style={styles.navChatButton} onPress={handleNavigateChat}>
                <Text style={{
                  fontSize: 12,
                  color: '#fff',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                }}
                >
                  Navigate to chat
                </Text>
              </TouchableOpacity>
            </>
          )
          : (
            <>
              <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
                <Text style={{
                  fontSize: 12,
                  color: '#fff',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                }}
                >
                  Join this event
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navChatButton} onPress={() => { navigation.navigate('Chat', { event }); }}>
                <Text style={{
                  fontSize: 12,
                  color: '#fff',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                }}
                >
                  Navigate to chat
                </Text>
              </TouchableOpacity>
            </>
          )}

      {/* Quit event Dialog */}
      <Dialog visible={quitDialog} onDismiss={() => setQuitDialog(!quitDialog)} dismissable={false}>
        <Dialog.Title>You have quit the event</Dialog.Title>
        <Dialog.Content><Text>Join more on the map</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { setQuitDialog(!quitDialog); navigation.navigate('Map'); }}>Back to Map</Button>
        </Dialog.Actions>
      </Dialog>

      {/* Join event Dialog */}
      <Dialog visible={joinDialog} onDismiss={() => setJoinDialog(!joinDialog)} dismissable={false}>
        <Dialog.Title>You have join the event now</Dialog.Title>
        <Dialog.Content><Text>Navigate to chat room for disscussion or check this event in your profile</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { setJoinDialog(!joinDialog); navigation.navigate('Chat', { event }); }}>Chat room</Button>
          <Button onPress={() => { setJoinDialog(!joinDialog); navigation.navigate('Map'); }}>Back to Map</Button>
        </Dialog.Actions>
      </Dialog>

      {/* Start event Dialog */}
      <Dialog visible={startDialog} onDismiss={() => setStartDialog(!startDialog)} dismissable={false}>
        <Dialog.Title>The event have started!</Dialog.Title>
        <Dialog.Content><Text>Navigate to chat room for disscussion or back to map</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { setStartDialog(!startDialog); navigation.navigate('Chat', { event }); }}>Chat room</Button>
          <Button onPress={() => { setStartDialog(!startDialog); navigation.navigate('Map'); }}>Back to Map</Button>
        </Dialog.Actions>
      </Dialog>

      {/* End event Dialog */}
      <Dialog visible={endDialog} onDismiss={() => setEndDialog(!endDialog)} dismissable={false}>
        <Dialog.Title>The event have started!</Dialog.Title>
        <Dialog.Content><Text>Navigate to chat room for disscussion or back to map</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { setEndDialog(!endDialog); navigation.navigate('Chat', { event }); }}>Chat room</Button>
          <Button onPress={() => { setEndDialog(!endDialog); navigation.navigate('Map'); }}>Back to Map</Button>
        </Dialog.Actions>
      </Dialog>

      {/* Cancel event Dialog */}
      <Dialog visible={cancelDialog} onDismiss={() => setEndDialog(!cancelDialog)} dismissable={false}>
        <Dialog.Title>The event has been canceled!</Dialog.Title>
        <Dialog.Content><Text>Back to map</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { setEndDialog(!cancelDialog); navigation.navigate('Map'); }}>Back to Map</Button>
        </Dialog.Actions>
      </Dialog>

      {/* People not enough Dialog */}
      <Dialog visible={peopleDialog} onDismiss={() => setPeopleDialog(!peopleDialog)} dismissable={false}>
        <Dialog.Title>Sorry current participants less than the minmum you have set</Dialog.Title>
        <Dialog.Content><Text>Invite others or cancel the reset the event </Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { setPeopleDialog(!peopleDialog); }}>OK</Button>
        </Dialog.Actions>
      </Dialog>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#323C47',
    alignItems: 'center',
  },
  columnCentre: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  eventNameFont: {
    color: '#fff',
    fontSize: 24,
  },
  titleFont: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  previewImg: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderColor: '#d9d9d9',
    backgroundColor: '#fff',
    color: '#d9d9d9',
  },
  headerText: {
    fontSize: 36,
    marginLeft: 15,
    flexShrink: 1,
  },
  participantContainer: {
    width: '90%',
    marginTop: 10,
  },
  participantList: {
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingContainer: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'column',
  },
  settingList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  settingItem: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  settingItemContent: {
    fontSize: 15,
  },
  imgContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
  },
  joinButton: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    width: '90%',
    height: 50,
    justifyContent: 'center',
  },
  quitButton: {
    elevation: 8,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    width: '90%',
    height: 50,
    justifyContent: 'center',
  },
  navChatButton: {
    elevation: 8,
    backgroundColor: '#e69b00',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    width: '90%',
    height: 50,
    justifyContent: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  settingText: {
    fontSize: 15,
    color: 'black',
  },
});
