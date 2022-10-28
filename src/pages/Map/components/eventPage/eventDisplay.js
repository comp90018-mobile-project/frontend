import { useState, useEffect} from 'react';
import { StyleSheet, Modal, Image, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Pressable, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

// props 传进来一个event object
// 在对应test.位置调用传进来object的属性
const test =  {
  _id: "63577c74db2b04b13f7d38e8",
  active: true,
  created_at: "2022-10-20 15:11:51",
  images: [],
  latitude: "-37.797",
  longitude: "144.9611",
  name: "Play Badminton",
  organiser: "Nine1ie",
  participants: [],
  preview: "https://elasticbeanstalk-ap-southeast-2-065755014425.s3.ap-southeast-2.amazonaws.com/public/F913B075-C10D-4B81-9EC2-8AA057D26BBE.jpg",
  settings: {
    description: "Hello Hello How are you",
    duration: "3 hours +",
    max_participant: "6",
    min_participant: "2",
    start_time: "2022-10-25T05:59:21.634Z",
    theme_color: "#FFF",
    type: "Sport",
  },
}

export default function EventDisplay({props}) {
  // const {eventToBeDisplay} = props  -- 传进来的一个event object
  // 拉取当前用户的state，判断此用户是否已经加入或者主持了一个event为后续能否加入event做判断

  const currentUser = useSelector((state) => state.user);
  const hostevent = currentUser.hostevent[0]
  const participantevent = currentUser.participantevent
  console.log(hostevent.preview)
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={{width: '100%', paddingTop: 20, height: '95%'}}>

      {hostevent != '' ? 
  
      <View style={styles.columnCentre}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="file-image-plus-outline" style={styles.previewImg} size={130} />
          <View style={styles.headerText}>
            <Text style={styles.eventNameFont}>{hostevent.event_name}</Text>
            <Text style={{color: '#fff', fontSize: 16}}></Text>
          </View>
        </View>

        <View style={styles.participantContainer}>
            <Text style={styles.titleFont}>Participants</Text>
            <View style={styles.participantList}>
              <Image style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}}
                    source={hostevent.preview}/>
            </View>
        </View>
      </View>
      : 
      <Text>hi</Text>
      }
      </ScrollView>
      {/* <ScrollView style={{width: '100%', paddingTop: 20, height: '95%'}}>
        <View style={styles.columnCentre}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="file-image-plus-outline" style={styles.previewImg} size={130} />
            <View style={styles.headerText}>
              <Text style={styles.eventNameFont}>{test.name}</Text>
              <Text style={{color: '#fff', fontSize: 16}}></Text>
            </View>
          </View>

          <View style={styles.participantContainer}>
            <Text style={styles.titleFont}>Participants</Text>
            <View style={styles.participantList}>
              <Image style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}}
                    source={test.preview}/>
            </View>
          </View>

          <View style={styles.settingContainer}>
      
            <Text style={styles.titleFont}>Event Information</Text>

            <View style={styles.settingList}>

              <View style={styles.settingItem}>
                <Text>Start Time</Text>
                <Text style={styles.settingItemContent}>
                  {test.settings.start_time.split('T')[0].slice(5,10) + ' / ' +
                  test.settings.start_time.split('T')[1].slice(0,5)}
                </Text>
              </View>

              <View style={styles.settingItem}>
                <Text>Duration</Text>
                <Text style={styles.settingItemContent}> {test.settings.duration} </Text>
              </View>

              <View style={styles.settingItem}>
                <Text>Min & Max Participants</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.settingItemContent}> {test.settings.min_participant} </Text>
                  <Text style={{fontSize: 24, fontWeight: 'bold'}}> - </Text>
                  <Text style={styles.settingItemContent}> {test.settings.max_participant} </Text>
                </View>
              </View>

              <View style={styles.settingItem}>
                <Text>Type</Text>
                <Text style={styles.settingItemContent}>{test.settings.type}</Text>
              </View>

              <View style={styles.settingItem}>
                <Text>Description</Text>
                <View style={{width: '50%'}}>
                  <Text>{test.settings.description}</Text>
                </View>
              </View>

            </View>
          </View>

          <View style={styles.imgContainer}>
            <Text style={styles.titleFont}>Images</Text>
            <Image style={{width: '100%', height: 200, borderRadius: 15,}}
              source={require('../../../../../assets/location.png')}/>
          </View>
        </View>            
      </ScrollView>

      {test.participants.includes(currentUser) == true ? 
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
      :
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
      }
      
      <TouchableOpacity style={styles.navChatButton}>
        <Text style={{
          fontSize: 12, 
          color: "#fff", 
          fontWeight: "bold", 
          alignSelf: "center", 
          textTransform: "uppercase"}}>
          Navigate to chat
        </Text>
      </TouchableOpacity> */}
      
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