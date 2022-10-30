import { useCallback, useMemo, useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EventHistoryCard from './components/eventHitstoryCard';
import * as ImagePicker from 'expo-image-picker';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync}  from '../../utils/notification'
import {updateUserPushToken, updateCovidStatus} from '../../services/api'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


function Profile({navigation}) {
  const user = useSelector((state) => state.user)
  console.log('用户:',user)
  const { email, covid, token, eventhistory } = user
  // const [userName, setName] = useState('Nine1ie')
  // const [userAvatar, setAvatar] = useState('')
  const [modal, setModal] = useState(false)
  
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
      registerForPushNotificationsAsync().then(
        (token) => {
          // setExpoPushTken(token)
          if (email) {
            dispatch(updateUserPushToken({email: email, token: token}))
          }
        }
      );
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user]);

  const covidOptions = [
    {key: 1, label: "positive", value: 1},
    {key: 2, label: "pending", value: 2},
    {key: 3, label: "negative", value: 3},
  ]
  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={modal}
              onRequestClose={() => {setModal(!modal)}}>
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>Missing Inputs</Text>
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModal(!modal)}>
                      <Text style={styles.textStyle}>Retry</Text>
                  </Pressable>
              </View>
          </View>
      </Modal>

      <View style={styles.userInfo}>
        <ModalSelector data={[{key:1, label: 'Upload from gallery'}]}>
          <Image style={{width: 130, height: 130, borderWidth: 1, borderRadius: 100}} source={{uri: user.avatar !=="" ? user.avatar : undefined }}/>
        </ModalSelector>
        <Text style={{fontSize: 36, fontWeight: 'bold', marginLeft: 20}}>{user.username}</Text>
      </View>
      
      <View style={styles.myevent}>
        <Text style={{alignSelf: 'flex-start', fontSize: 20, marginLeft: 10,
          textDecorationLine: 'underline'}}>
            My Event
        </Text>

        <View style={{width: '100%', height: 100, marginVertical: 10, 
        backgroundColor: '#cdcdcd', borderRadius: 20, padding: 10}}>
          {user.hostevent.length == 0 && user.participantevent.length == 0 ?
          <Text style={{justifyContent: 'center', alignItems: 'center'}}>
            Your haven't hosted or joined any event yet
            <TouchableOpacity onPress={()=>{navigation.navigate("Map")}}>
              <Text style={{marginVertical: 20}}>Join or Host an event now</Text>
            </TouchableOpacity>
          </Text>
            :
            user.hostevent.length != 0 ?
            <TouchableOpacity onPress={()=>{navigation.navigate("EventDisplay", {event: user.hostevent[0]})}}>
              <Text style={{marginVertical: 20}}>See the event hosting</Text>
            </TouchableOpacity>
              :
            <TouchableOpacity>
              <Text style={{marginVertical: 20}}>See the event you participanting</Text>
            </TouchableOpacity>
          }
        </View>
      </View>


      <View style={styles.covidwarning}>
        <Text style={{alignSelf: 'flex-start', fontSize: 20, marginLeft: 10,
          textDecorationLine: 'underline'}}>
            Covid Exposure
        </Text>
        
        <View style={{width: '100%', height: 100, marginVertical: 10, 
        backgroundColor: 'green', borderRadius: 20, padding: 15}}>
          <Text style={{color: '#fff', fontSize: 24}}>{covid}</Text>
          <ModalSelector
              data={covidOptions}
              onChange={(option) => {
                  const label = option.label
                  dispatch(updateCovidStatus({email: email, status: label}))
              }}>
              <TouchableOpacity style={{marginVertical: 5}}>
                <Text style={{color: '#fff', marginVertical: 10}}>Update your RAT result </Text>
              </TouchableOpacity>
          </ModalSelector>
        </View>
      </View>


      <View style={styles.historys}>
        <Text style={{alignSelf: 'flex-start', fontSize: 20, marginLeft: 10,
        textDecorationLine: 'underline'}}>
          Event History
        </Text>

        <ScrollView style={{width: '100%', height: 350, marginVertical: 10}}>
          <View style={styles.historyCards}>
            {user.eventhistory.length != 0 ?
              user.eventhistory.map((key, event) => {
                return <EventHistoryCard props={{eventName: event.name, eventDuration: event.duration}}/>
              })
              :
              <EventHistoryCard props={{eventName: "No history events yet", eventDuration: '--'}}/>
            }
          </View>
        </ScrollView>
      </View>

    </View>

  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
    
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
  },
  historyCards: {
    width: '100%',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})