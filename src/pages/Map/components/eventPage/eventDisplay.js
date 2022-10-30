import { useState, useEffect} from 'react';
import { StyleSheet, Modal, Image, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Pressable, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import EventPage from './eventPage'

export default function EventDisplay({route, navigation}) {
  const {event} = route.params
  const currentUser = useSelector((state) => state.user);
  const hostevent = currentUser.hostevent[0]
  const participantevent = currentUser.participantevent[0]
  console.log('event', event)

  const checkUser = () => {
    if (event.organiser == currentUser.username) {
      return 'host'
    } else if (event.participants.find(e => e.username === currentUser.username)) {
      return 'participant'
    } else {
      return 'joinable'
    }
  }

  

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={{width: '100%', paddingTop: 20, height: '95%'}}>
        <View style={styles.columnCentre}>

          <View style={styles.header}>
            {event.preview != '' ? 
            <Image styles={styles.previewImg} size={130} source={{uri: event.preview}}></Image>
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
            <Text style={styles.titleFont}>Images</Text>
            {hostevent.images.length != 0 ?
              <Image style={{width: '100%', height: 200, borderRadius: 15,}}
              source={{uri: hostevent.images[0]}}/>
              :
              <Image style={{width: '100%', height: 200, borderRadius: 15,}}
              source={require('../../../../../assets/location.png')}/>
            }
          </View>
        </View>
      </ScrollView>

      {checkUser() === 'participant' ? 
      <>
      <TouchableOpacity style={styles.quitButton}>
        <Text style={{
        fontSize: 12, 
        color: "#fff", 
        fontWeight: "bold", 
        alignSelf: "center", 
        textTransform: "uppercase"}}>
        Quit this event
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navChatButton} onPress = {() => {navigation.navigate('Chat',{event});}}>
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
        <TouchableOpacity style={styles.joinButton}>
          <Text style={{
          fontSize: 12, 
          color: "#fff", 
          fontWeight: "bold", 
          alignSelf: "center", 
          textTransform: "uppercase"}}>
          Start the event
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navChatButton} onPress = {() => {navigation.navigate('Chat',{event});}}>
          <Text style={{
          fontSize: 12, 
          color: "#fff", 
          fontWeight: "bold", 
          alignSelf: "center", 
          textTransform: "uppercase"}}>
          Navigate to chat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quitButton}>
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
      <>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={{
        fontSize: 12, 
        color: "#fff", 
        fontWeight: "bold", 
        alignSelf: "center", 
        textTransform: "uppercase"}}>
        Join this event
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navChatButton} onPress = {() => {navigation.navigate('Chat',{event});}}>
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