import { useState, useEffect} from 'react';
import { StyleSheet, Modal, Image, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Pressable, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { fetchEvent, fetchUser, updateUserQuitEvent, updateEventParticipants, updateUserParticipate, updateEventActive } from '../../../../services/api';
import { useFocusEffect } from '@react-navigation/core';
import { Dialog, Button } from 'react-native-paper';

export default function EventDisplay({route, navigation}) {
  const dispatch = useDispatch()
  // get current user info
  const currentUser = useSelector((state) => state.user);
  // get the event to display
  const {eventDisplay} = useSelector((state) => state.event);
  const [event, setEvent] = useState(eventDisplay)

  console.log("event is: ", event)
  // alter dialogs
  const [quitDialog, setQuitDialog] = useState(false)
  const [joinDialog, setJoinDialog] = useState(false)
  const [startDialog, setStartDialog] = useState(false)
  const [endDialog, setEndDialog] = useState(false)
  // location initial region
  const [initialRegion, setInitialRegion] = useState(
    {
    latitude: event.latitude,
    longitude: event.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })

  const checkUser = () => {
    if (event.organiser === currentUser.email) {
      return 'host'
    } else if (event.participants.find(e => e === currentUser.email)) {
      return 'participant'
    } else {
      return 'joinable'
    }
  }
  console.log('user right', checkUser())

  const handleNavigateChat = () => {
    navigation.navigate('Chat',{event})
  }

  const handleJoinEvent = () => {
    // 如果当前参与人数量 小于 max_participant & 状态是pending 可以join
    if (event.participants.length < event.settings.max_participant && event.active == 'pending') {
    // update event participants[]
    dispatch(updateEventParticipants(
      { event_id: event._id, 
        participants: [...event.participants].concat(currentUser.email)
      }))
    // update user participate
    dispatch(updateUserParticipate(
      { email: currentUser.email, 
        participantevent: [event._id]
      }))
    // show success join dialog
    setJoinDialog(true)
    }
  }

  const handleQuitEvent = () => {
    // update event participants[]
    let userToRemove = currentUser.email;
    dispatch(updateEventParticipants(
      {
        event_id: event._id, 
        participants: event.participants.filter((item) => {return item != userToRemove})
      }
    ));
    // clear event_participant in user profile
    dispatch(updateUserQuitEvent(currentUser.email)); 
    // show quit dialog if success
    setQuitDialog(true)
  }

  const handleStartEvent = () => {
    // 如果当前参与人数量 大于等于 min_participant 可以start
    if (event.participants.length >= event.settings.min_participant) {
      dispatch(updateEventActive(
        {
          event_id: event._id,
          active: 'started'
        }))
      setStartDialog(true)
    }
  }
  // todo
  const handleEndEvent = () => {
    dispatch(updateEventActive(
      {
        event_id: event._id,
        active: 'ended'
      }))
    setEndDialog(true)
    
  }
  // todo
  const handleCancelEvent = () => {
    // 整个删除这个创建好的event
    // 清除已加入用户的event host & event participate & event history
    // 清除event object
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={{width: '100%', paddingTop: 20, height: '95%'}}>
        <View style={styles.columnCentre}>

          <View style={styles.header}>
            {event.preview !== "" ? 
            <Image style={styles.previewImg} source={{uri: event.preview}}></Image>
            :
            <MaterialCommunityIcons name="file-image-plus-outline" style={styles.previewImg} size={130} />
            }
            <View style={styles.headerText}>
              <Text style={styles.eventNameFont}>{event.name}</Text>
              <Text style={{color: '#fff', fontSize: 16}}>{event.organiser}</Text>
            </View>
          </View>

          <View style={styles.participantContainer}>
              <Text style={styles.titleFont}>Participants</Text>
              <View style={styles.participantList}>
                {event.participants.map((participant, index) => {
                  return <Image key={index} source={{uri: participant.avatar}} style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}} />
                })}
              </View>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.titleFont}>Event Information</Text>
            <View style={styles.settingList}>

              <View style={styles.settingItem}>
                <Text>Start Time</Text>
                <Text style={styles.settingItemContent}>
                  {event.settings.start_time.split('T')[0].slice(5,10) + ' / ' +
                  event.settings.start_time.split('T')[1].slice(0,5)}
                </Text>
              </View>

              <View style={styles.settingItem}>
                <Text>Duration</Text>
                <Text style={styles.settingItemContent}> {event.settings.duration} </Text>
              </View>

              <View style={styles.settingItem}>
                <Text>Min & Max Participants</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.settingItemContent}> {event.settings.min_participant} </Text>
                  <Text style={{fontSize: 24, fontWeight: 'bold'}}> - </Text>
                  <Text style={styles.settingItemContent}> {event.settings.max_participant} </Text>
                </View>
              </View>

              <View style={styles.settingItem}>
                <Text>Type</Text>
                <Text style={styles.settingItemContent}>{event.settings.type}</Text>
              </View>

              <View style={styles.settingItem}>
                <Text>Description</Text>
                <View style={{width: '50%'}}>
                  <Text>{event.settings.description}</Text>
                </View>
              </View>

            </View>
          </View>

          <View style={styles.imgContainer}>
            <Text style={styles.titleFont}>Location</Text>
            <MapView initialRegion={initialRegion} showsUserLocation
                      style={{width: '100%', height: 200, borderRadius: 15,}}>
              <Marker coordinate={{ latitude: event.latitude, longitude: event.longitude }}>
                <Image style={{width: 35, height: 35, borderRadius: 20, resizeMode: 'contain',}}
                source={{uri: currentUser.avatar !=="" ? currentUser.avatar : undefined }}/>
              </Marker>
            </MapView>
          </View>

        </View>
      </ScrollView>

      {checkUser() === 'participant'? 
      <>
        {/* participant quit event */}
        <TouchableOpacity style={styles.quitButton} onPress={handleQuitEvent}>
          <Text style={{
          fontSize: 12, 
          color: "#fff", 
          fontWeight: "bold", 
          alignSelf: "center", 
          textTransform: "uppercase"}}>
          Quit this event
          </Text>
        </TouchableOpacity>
        
        {/* participant navigate to chat */}
        <TouchableOpacity style={styles.navChatButton} onPress={handleNavigateChat}>
          <Text style={{
          fontSize: 12, 
          color: "#fff", 
          fontWeight: "bold", 
          alignSelf: "center", 
          textTransform: "uppercase"}}>
          Navigate to chat
          </Text>
        </TouchableOpacity>
      </>
        : 
      checkUser() === 'host' ?
      <>
        {/* host start event and cancel event */}
        {event.active === 'pending'?
          <>
          {/* host start event */}
          <TouchableOpacity style={styles.joinButton} onPress={handleStartEvent}>
            <Text style={{
            fontSize: 12, 
            color: "#fff", 
            fontWeight: "bold", 
            alignSelf: "center", 
            textTransform: "uppercase"}}>
            Start the event
            </Text>
          </TouchableOpacity> 
          {/* host cancel event */}
          <TouchableOpacity style={styles.quitButton} onPress={handleCancelEvent}>
            <Text style={{
            fontSize: 12, 
            color: "#fff", 
            fontWeight: "bold", 
            alignSelf: "center", 
            textTransform: "uppercase"}}>
            Cancel the event
            </Text>
          </TouchableOpacity>
          </>
          :
          <TouchableOpacity style={styles.quitButton} onPress={handleEndEvent}>
            <Text style={{
            fontSize: 12, 
            color: "#fff", 
            fontWeight: "bold", 
            alignSelf: "center", 
            textTransform: "uppercase"}}>
            End the event
            </Text>
          </TouchableOpacity> 
        }
        {/* host navigate to chat */}
        <TouchableOpacity style={styles.navChatButton} onPress={handleNavigateChat}>
          <Text style={{
          fontSize: 12, 
          color: "#fff", 
          fontWeight: "bold", 
          alignSelf: "center", 
          textTransform: "uppercase"}}>
          Navigate to chat
          </Text>
        </TouchableOpacity>
      </>
      :
      <>
      <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
        <Text style={{
        fontSize: 12, 
        color: "#fff", 
        fontWeight: "bold", 
        alignSelf: "center", 
        textTransform: "uppercase"}}>
        Join this event
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navChatButton} onPress = {() => {navigation.navigate('Chat',{event})}}>
        <Text style={{
        fontSize: 12, 
        color: "#fff", 
        fontWeight: "bold", 
        alignSelf: "center", 
        textTransform: "uppercase"}}>
        Navigate to chat
        </Text>
      </TouchableOpacity>
      </>
      }
    
    {/* Quit event Dialog*/}
    <Dialog visible={quitDialog} onDismiss={()=>setQuitDialog(!quitDialog)} dismissable={false}>
        <Dialog.Title>You have quit the event</Dialog.Title>
        <Dialog.Content><Text>Join more on the map</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={()=> {setQuitDialog(!quitDialog); navigation.navigate('Map')}}>Back to Map</Button>
        </Dialog.Actions>
    </Dialog>
    
    {/* Join event Dialog */}
    <Dialog visible={joinDialog} onDismiss={()=>setJoinDialog(!joinDialog)} dismissable={false}>
        <Dialog.Title>You have join the event now</Dialog.Title>
        <Dialog.Content><Text>Navigate to chat room for disscussion or check this event in your profile</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={()=>{setJoinDialog(!joinDialog); navigation.navigate('Chat',{event})}}>Chat room</Button>
          <Button onPress={()=>{setJoinDialog(!joinDialog); navigation.navigate('Map')}}>Back to Map</Button>
        </Dialog.Actions>
    </Dialog>

    {/* Start event Dialog */}
    <Dialog visible={startDialog} onDismiss={()=>setStartDialog(!startDialog)} dismissable={false}>
        <Dialog.Title>The event have started!</Dialog.Title>
        <Dialog.Content><Text>Navigate to chat room for disscussion or back to map</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={()=>{setStartDialog(!startDialog); navigation.navigate('Chat',{event})}}>Chat room</Button>
          <Button onPress={()=>{setStartDialog(!startDialog); navigation.navigate('Map')}}>Back to Map</Button>
        </Dialog.Actions>
    </Dialog>

    {/* End event Dialog */}
    <Dialog visible={endDialog} onDismiss={()=>setEndDialog(!endDialog)} dismissable={false}>
        <Dialog.Title>The event have started!</Dialog.Title>
        <Dialog.Content><Text>Navigate to chat room for disscussion or back to map</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={()=>{setEndDialog(!endDialog); navigation.navigate('Chat',{event})}}>Chat room</Button>
          <Button onPress={()=>{setEndDialog(!endDialog); navigation.navigate('Map')}}>Back to Map</Button>
        </Dialog.Actions>
    </Dialog>    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#323C47',
    alignItems: 'center'
  },
  columnCentre: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  eventNameFont: {
    color: '#fff', 
    fontSize: 36, 
    fontWeight: 'bold'
  },
  titleFont: {
    color: '#fff',
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 10
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
    borderColor: '#d9d9d9'
  },
  headerText: {
    fontSize: 36,
    marginLeft: 15,
    flexShrink: 1
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
    alignItems: 'center'
  },
  settingContainer: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'column'
  },
  settingList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10
  },
  settingItem: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  },
  settingItemContent: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  imgContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20
  },
  joinButton: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    width: "90%",
    height: 50,
    justifyContent: 'center'
  },
  quitButton: {
    elevation: 8,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    width: "90%",
    height: 50,
    justifyContent: 'center'
  },
  navChatButton: {
    elevation: 8,
    backgroundColor: "#e69b00",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    width: "90%",
    height: 50,
    justifyContent: 'center'
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