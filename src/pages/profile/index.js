import * as Device from 'expo-device';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import {
  useCallback, useEffect, useRef, useState
} from 'react';
import {
  Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { useDispatch, useSelector } from 'react-redux';
import Navigator from '../../components/navigator/navigator';
import {
  fetchEvent, fetchUser, updateCovidStatus, updateUserAvatar, updateUserPushToken
} from '../../services/api';
import { registerForPushNotificationsAsync } from '../../utils/notification';
import { uploadImage } from '../../utils/upload';
import EventHistoryCard from './components/eventHitstoryCard';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Profile({ navigation }) {
  const user = useSelector((state) => state.user);
  const { events } = useSelector((state) => state.event);
  const func = useCallback(() => { dispatch(fetchUser(user.email)); }, [user]);
  useEffect(func, []);
  const {
    email, covid, token, eventhistory,
  } = user;
  const [modal, setModal] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();

  // handle event history
  const eventHistory = [];
  if (user.eventhistory.length != 0) {
    events.forEach((i) => {
      if (user.eventhistory.includes(i._id)) {
        eventHistory.push(i);
      }
    });
  }

  const handleSeeHost = async () => {
    await dispatch(fetchEvent(user.hostevent[0]));
    navigation.navigate('EventDisplay', eventDisplay);
  };
  const handleSeeParticipate = async () => {
    await dispatch(fetchEvent(user.participantevent[0]));
    navigation.navigate('EventDisplay', eventDisplay);
  };

  const { eventDisplay } = useSelector((state) => state.event);

  // notification
  useEffect(() => {
    if (Device.isDevice) {
      registerForPushNotificationsAsync().then(
        (token) => {
          console.log("token is: ", token);
          if (email) {
            dispatch(updateUserPushToken({ email, token }));
          }
        },
      );
    }
      
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user]);

  const covidOptions = [
    { key: 1, label: 'positive', value: 1 },
    { key: 2, label: 'pending', value: 2 },
    { key: 3, label: 'negative', value: 3 },
  ];
  const imageSourceOptions = [
    { key: 1, label: 'Take a photo', value: 'camera' },
    { key: 2, label: 'From gallery', value: 'gallery' },
  ];
  const imagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };
  // select image from gallery or camera
  const selectImage = (label) => {
    if (label === 'Take a photo') {
      ImagePicker.getCameraPermissionsAsync().then(
        (result) => {
          if (result.granted === false) {
            ImagePicker.requestCameraPermissionsAsync().then(
              (result) => {
                if (result.granted === false) {
                  alert('Permission to access camera is required!');
                }
              },
            );
          }
          ImagePicker.launchCameraAsync(imagePickerOptions).then(
            (result) => {
              if (!result.cancelled) {
                uploadImage(result.uri).then((url) => {
                  setAvatar(url);
                  // dispatch(updateUserAvatar(user.email, url));
                  dispatch(updateUserAvatar({email: user.email, avatar: url}))
                });
              }
            },
          );
        },
      );
    } else if (label === 'From gallery') {
      ImagePicker.getMediaLibraryPermissionsAsync().then(
        (result) => {
          if (result.granted === false) {
            ImagePicker.requestMediaLibraryPermissionsAsync().then(
              (result) => {
                if (result.granted === false) {
                  alert('Permission to access gallery is required!');
                }
              },
            );
          }
          ImagePicker.launchImageLibraryAsync(imagePickerOptions).then(
            (result) => {
              if (!result.cancelled) {
                uploadImage(result.uri).then((url) => {
                  setAvatar(url);
                  dispatch(updateUserAvatar({email: user.email, avatar: url}));
                });
              }
            },
          );
        },
      );
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent
          visible={modal}
          onRequestClose={() => { setModal(!modal); }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Missing Inputs</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModal(!modal)}
              >
                <Text style={styles.textStyle}>Retry</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.userInfo}>
          {console.log('avatar', avatar, 'user.avatar', user.avatar)}
          <ModalSelector
            data={imageSourceOptions}
            optionStyle={{ height: 45 }}
            optionTextStyle={{ fontSize: 20 }}
            cancelTextStyle={{ fontSize: 20 }}
            onChange={(option) => {
              selectImage(option.label);
            }}
          >
            {avatar ? (
              <Image
                style={{
                  width: 130, height: 130, borderWidth: 1, borderRadius: 100,
                }}
                source={{ uri: avatar }}
              />
            ) : (
              <Image
                style={{
                  width: 130, height: 130, borderWidth: 1, borderRadius: 100,
                }}
                source={{ uri: user.avatar !== '' ? user.avatar : undefined }}
              />
            )}
          </ModalSelector>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 20 }}>{user.username}</Text>
        </View>

        <View style={styles.myevent}>
          <Text style={{
            alignSelf: 'flex-start',
            fontSize: 20,
            marginLeft: 10,
            textDecorationLine: 'underline',
          }}
          >
            My Event
          </Text>

          <View style={{
            width: '100%',
            height: 100,
            marginVertical: 10,
            backgroundColor: '#cdcdcd',
            borderRadius: 20,
            padding: 10,
          }}
          >
            {user.hostevent.length == 0 && user.participantevent.length == 0
              ? (
                <TouchableOpacity onPress={() => { navigation.navigate('Map'); }}>
                  <Text style={{
                    justifyContent: 'center', alignItems: 'center', marginTop: 25, fontWeight: 'bold',
                  }}
                  >
                    Your haven't hosted or joined any event yet, Join or Host an event now!
                  </Text>
                </TouchableOpacity>
              )
              : user.hostevent.length != 0
                ? (
                  <TouchableOpacity onPress={handleSeeHost}>
                    <Text style={{ marginTop: 30, fontWeight: 'bold' }}>See the event hosting</Text>
                  </TouchableOpacity>
                )
                : (
                  <TouchableOpacity onPress={handleSeeParticipate}>
                    <Text style={{ marginTop: 30, fontWeight: 'bold' }}>See the event you participanting</Text>
                  </TouchableOpacity>
                )}
          </View>
        </View>

        <View style={styles.covidwarning}>
          <Text style={{
            alignSelf: 'flex-start',
            fontSize: 20,
            marginLeft: 10,
            textDecorationLine: 'underline',
          }}
          >
            Covid Exposure
          </Text>

          <View style={covid == 'positive' ? (styles.covidInfoPos) : covid == 'pending' ? (styles.covidInfoPen) : (styles.covidInfoNeg)}>
            <Text style={{ color: '#fff', fontSize: 24, textTransform: 'capitalize' }}>{covid}</Text>
            <ModalSelector
              data={covidOptions}
              optionStyle={{ height: 45 }}
              optionTextStyle={{ fontSize: 20 }}
              cancelTextStyle={{ fontSize: 20 }}
              onChange={(option) => {
                const { label } = option;
                dispatch(updateCovidStatus({ email, status: label }));
              }}
            >
              <TouchableOpacity style={{ marginVertical: 5 }}>
                <Text style={{ color: '#fff', marginVertical: 10, fontWeight: 'bold' }}>Update your RAT result </Text>
              </TouchableOpacity>
            </ModalSelector>
          </View>
        </View>

        <View style={styles.historys}>
          <Text style={{
            alignSelf: 'flex-start', fontSize: 20, marginLeft: 10, textDecorationLine: 'underline',
          }}
          >
            Host Event History
          </Text>

          <ScrollView style={{ width: '100%', height: 350, marginVertical: 10 }}>
            <View style={styles.historyCards}>
              {user.eventhistory.length != 0
                ? eventHistory.map((event, index) => <EventHistoryCard key={index} props={{ eventName: event.name, eventDuration: event.settings.duration, eventPreview: event.preview }} />)
                : <EventHistoryCard props={{ eventName: 'No history events yet', eventDuration: '--' }} />}
            </View>
          </ScrollView>
        </View>

      </SafeAreaView>
      <Navigator navigation={navigation} />
    </>

  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  myevent: {
    width: '90%',
    alignItems: 'center',
  },
  covidwarning: {
    width: '90%',
    alignItems: 'center',
  },
  historys: {
    width: '90%',
    alignItems: 'center',
    height: 310,
  },
  historyCards: {
    width: '100%',
    alignItems: 'center',
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  covidInfoNeg: {
    width: '100%',
    height: 100,
    marginVertical: 10,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 15,
  },
  covidInfoPos: {
    width: '100%',
    height: 100,
    marginVertical: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 15,
  },
  covidInfoPen: {
    width: '100%',
    height: 100,
    marginVertical: 10,
    backgroundColor: 'yellow',
    borderRadius: 20,
    padding: 15,
  },

});
