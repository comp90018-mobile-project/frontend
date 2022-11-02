/* eslint-disable react/jsx-filename-extension */
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
    Image, SafeAreaView, ScrollView, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ModalSelector from 'react-native-modal-selector';
import { Button, Dialog, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../../../services/api';
import { uploadImage } from "../../../../utils/upload";
import styles from './eventPageStyles';

function EventPage({route, navigation }) {
    const dispatch = useDispatch()
    const {lat, lon} = route.params
    
    // current user states
    const currentUser = useSelector((state) => state.user)
    

    // modal states
    const [inputDialog, setInputDialog] = useState(false)
    const [repeatCreateDialog, setRepeatCreateDialog] = useState(false)
    const [successCreateDialog, setSuccessCreateDialog] = useState(false)

    // user inputs states
    const [preview, setPreview] = useState('');
    const [eventName, setName] = useState('Default Event');
    const [eventStartTime, setStartTime] = useState(new Date());
    const [eventDuration, setDuration] = useState('30 mins');
    const [eventMinParticipant, setMinParticipant] = useState('2');
    const [eventMaxParticipant, setMaxParticipant] = useState('5');
    const [eventType, setEventType] = useState('Study');
    const [eventDescription, setEventDescription] = useState('This is a description for the event you create');

    // picker options
    const durationOption = [
        {key: 1, label: '30 mins', value: 30},
        {key: 2, label: '1 hour', value: 60},
        {key: 3, label: '1 hour 30mins', value: 90},
        {key: 4, label: '2 hours', value: 120},
        {key: 5, label: '2 hours 30mins', value: 150},
        {key: 6, label: '3 hours +', value: 180}
    ]
    const participantOption = [
        {key: 1, label: "2", value: 2},
        {key: 2, label: "3", value: 3},
        {key: 3, label: "4", value: 4},
        {key: 4, label: "5", value: 5},
        {key: 5, label: "6", value: 6}
    ]
    const typeOption = [
        {key: 1, label: 'Study', value: 'study'},
        {key: 2, label: 'Entertainment', value: 'entertainment'},
        {key: 3, label: 'Sport', value: 'sport'}
    ]
    const imageSourceOptions = [
        {key: 1, label: 'Take a photo', value: 'camera'},
        {key: 2, label: 'From gallery', value: 'gallery'}
    ]
    const imagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    }

    // Image picker method
    const selectImage = (label) => {
      if (label === 'Take a photo') {
        ImagePicker.getCameraPermissionsAsync().then(
          (result) => {
            if (result.granted === false) {
              ImagePicker.requestCameraPermissionsAsync().then(
                (result) => {
                    if (result.granted === false) {
                        alert('Permission to access camera is required!');
                        return;
                    }
                }
              )
            }
            ImagePicker.launchCameraAsync(imagePickerOptions).then(
              (result) => {
                  if (!result.cancelled) {
                      uploadImage(result.uri).then((url) => {
                          setPreview(url)
                      })
                  }
              }
            )
          }
        )
      } else if (label === 'From gallery') {
          ImagePicker.getMediaLibraryPermissionsAsync().then(
              (result) => {
                  if (result.granted === false) {
                      ImagePicker.requestMediaLibraryPermissionsAsync().then(
                          (result) => {
                              if (result.granted === false) {
                                  alert('Permission to access gallery is required!');
                                  return;
                              }
                          }
                      )
                  }
                  ImagePicker.launchImageLibraryAsync(imagePickerOptions).then(
                      (result) => {
                          if (!result.cancelled) {
                              uploadImage(result.uri).then((url) => {
                                  console.log(url)
                                  setPreview(url)
                              })
                          }
                      }
                  )
              }
          )
      }
    }

    // handle create event method
    const handleCreateEvent = () => {
      //if (currentUser.hostevent.length == 0 && currentUser.participantevent.length == 0) {
        if (eventName == '' || eventDuration == '' || eventMinParticipant == '' || eventMaxParticipant == '' || eventDescription == '' || 
        eventStartTime == '' || eventStartTime > new Date() || parseInt(eventMinParticipant, 10) < parseInt(eventMaxParticipant, 10)) {
          const addEvent = {
            name: eventName,
            organiser: currentUser.email,
            preview: preview,
            longitude: lon,
            latitude: lat,
            participants: [currentUser.email],
            settings: {
                duration: eventDuration,
                min_participant: eventMinParticipant,
                max_participant: eventMaxParticipant,
                type: eventType,
                theme_color: "#FFF",
                description: eventDescription,
                start_time: eventStartTime
            },
            images: []
          }
          dispatch(createEvent(addEvent)) // 返回一个event id
        //   dispatch(fetchUser(currentUser.email))
          setSuccessCreateDialog(true)
        } else {
          setInputDialog(true)
        }
      //} 
      //else {
      //  setRepeatCreateDialog(true)
      //}
    }

    const initialRegion = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }

    return (
        <SafeAreaView style={styles.root}>
          {/* Inputs */}
          <ScrollView style={{width: '100%', paddingTop: 20, height: '95%'}}>
              <View style={styles.columnCentre}>
                  <View style={styles.header}>
                      <ModalSelector
                          data={imageSourceOptions}
                          optionStyle={{height: 45}}
                          optionTextStyle={{fontSize: 20}}
                          cancelTextStyle={{fontSize: 20}}
                          onChange={(option) => {
                              selectImage(option.label)
                          }}>
                          {
                            preview ? 
                            <Image source={{uri: preview}} style={styles.previewImg}/> :
                            <MaterialCommunityIcons name="file-image-plus-outline" style={styles.previewImg} size={130}/>
                          }
                      </ModalSelector>
                      <View style={styles.headerText}>
                          <TextInput style={styles.eventNameFont}
                                      onChangeText={(value) => setName(value)}
                                      value={eventName}
                                      placeholderTextColor={'#fff'}
                                      placeholder='Event Name'/>
                          <Text style={{color: '#fff', fontSize: 16}}>{currentUser.username}</Text>
                      </View>
                  </View>

                  <View style={styles.participantContainer}>
                      <Text style={styles.titleFont}>Participants</Text>
                      <View style={styles.participantList}>
                          <Image style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}}
                                  source={{uri: currentUser.avatar !=="" ? currentUser.avatar : undefined }}/>
                      </View>
                  </View>

                  <View style={styles.settingContainer}>
                      <Text style={styles.titleFont}>Settings</Text>
                      <View style={styles.settingList}>
                          <View style={styles.settingItem}>
                              <Text style={styles.settingText}>Start Time</Text>
                              <DateTimePicker
                                  style={{width: 150, height: 40}}
                                  mode={'time'}
                                  display='clock'
                                  value={eventStartTime}
                                  onChange={(value, date) => {
                                      setStartTime(date)
                                  }}
                                  is24Hour={true}
                              />
                          </View>
                          <Divider style={{backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10}}/>

                          <View style={styles.settingItem}>
                              <Text style={styles.settingText}>Duration</Text>
                              <ModalSelector
                                  data={durationOption}
                                  optionStyle={{height: 45}}
                                  optionTextStyle={{fontSize: 20}}
                                  cancelTextStyle={{fontSize: 20}}
                                  onChange={(option) => {
                                      setDuration(option.label)
                                  }}
                                  onModalClose={(option) => {
                                      setDuration(option.label)
                                  }}>
                                  <TextInput
                                      style={styles.settingItemContent}
                                      editable={false}
                                      placeholder="Set duration"
                                      value={eventDuration}/>
                              </ModalSelector>
                          </View>
                          <Divider style={{backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10}}/>

                          <View style={styles.settingItem}>
                              <Text style={styles.settingText}>Participants</Text>
                              <View style={{flexDirection: 'row'}}>
                                  <ModalSelector
                                      data={participantOption}
                                      optionStyle={{height: 45}}
                                      optionTextStyle={{fontSize: 20}}
                                      cancelTextStyle={{fontSize: 20}}
                                      onChange={(option) => {
                                          setMinParticipant(option.label)
                                      }}
                                      onModalClose={(option) => {
                                          setMinParticipant(option.label)
                                      }}>
                                      <TextInput
                                          style={styles.settingItemContent}
                                          editable={false}
                                          placeholder="Min"
                                          value={eventMinParticipant}/>
                                  </ModalSelector>
                                  {eventMinParticipant && eventMaxParticipant != '' ?
                                      <Text style={{fontSize: 15}}> - </Text>
                                      :
                                      <Text style={{fontSize: 15, color: '#c5c5c5'}}> - </Text>
                                  }
                                  <ModalSelector
                                      data={participantOption}
                                      optionStyle={{height: 45}}
                                      optionTextStyle={{fontSize: 20}}
                                      cancelTextStyle={{fontSize: 20}}
                                      onChange={(option) => {
                                          setMaxParticipant(option.label)
                                      }}
                                      onModalClose={(option) => {
                                          setMaxParticipant(option.label)
                                      }}>
                                      <TextInput
                                          style={styles.settingItemContent}
                                          editable={false}
                                          placeholder="Max"
                                          value={eventMaxParticipant}/>
                                  </ModalSelector>
                              </View>
                          </View>
                          <Divider style={{backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10}}/>

                          <View style={styles.settingItem}>
                              <Text style={styles.settingText}>Type</Text>
                              <ModalSelector
                                  data={typeOption}
                                  optionStyle={{height: 45}}
                                  optionTextStyle={{fontSize: 20}}
                                  cancelTextStyle={{fontSize: 20}}
                                  onChange={(option) => {
                                      setEventType(option.label)
                                  }}
                                  onModalClose={(option) => {
                                      setEventType(option.label)
                                  }}>
                                  <TextInput
                                      style={styles.settingItemContent}
                                      editable={false}
                                      placeholder="Set type"
                                      value={eventType}/>
                              </ModalSelector>
                          </View>
                          <Divider style={{backgroundColor: 'grey', width: '100%', height: 1, marginVertical: 10}}/>

                          <View style={styles.settingItem}>
                              <Text style={styles.settingText}>Description</Text>
                          </View>
                        
                          <View style={styles.settingItem}>
                            <View style={{alignSelf: 'flex-start', flexShrink: 1}}>
                                    <TextInput
                                        style={{fontSize: 16, color: "grey"}}
                                        multiline={true}
                                        numberOfLines={4}
                                        value={eventDescription}
                                        onChangeText={(value) => {
                                            setEventDescription(value)
                                        }}
                                        placeholder={'Description of your event'}/>
                            </View>
                           </View>
                      </View>
                  </View>

                  <View style={styles.imgContainer}>
                      <Text style={styles.titleFont}>Location</Text>
                      <MapView initialRegion={initialRegion} showsUserLocation
                      style={{width: '100%', height: 200, borderRadius: 15,}}>
                      <Marker coordinate={{ latitude: lat, longitude: lon }}>
                          <Image style={{width: 35, height: 35, borderRadius: 20, resizeMode: 'contain',}}
                          source={{uri: currentUser.avatar !=="" ? currentUser.avatar : undefined }}/>
                        </Marker>
                      </MapView>
                  </View>
              </View>
          </ScrollView>

          {/* Submit button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
              <Text style={{
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: "bold",
                  alignSelf: "center",
                  textTransform: "uppercase"
              }}>
                  Create Event
              </Text>
          </TouchableOpacity>

          {/* Invalid input dialog */}
          <Dialog visible={inputDialog} onDismiss={()=>setInputDialog(!inputDialog)} dismissable={false}>
            <Dialog.Title>Invalid inputs or Missing fields :(</Dialog.Title>
            <Dialog.Content>
              <Text style={{fontWeight: 'bold'}}>All fields are required</Text>
              <Text> </Text>
              <Text>*Start time must greater than current time</Text>
              <Text>*Max participant must greater than Min participant</Text>
              <Text> </Text>
              <Text style={{fontWeight: 'bold'}}>Please check your inputs and try again</Text>
            </Dialog.Content>
            <Dialog.Actions><Button onPress={()=>setInputDialog(!inputDialog)}>Try again</Button></Dialog.Actions>
          </Dialog>
          {/* Repeat create event dialog */}
          <Dialog visible={repeatCreateDialog} onDismiss={()=>setRepeatCreateDialog(!repeatCreateDialog)} dismissable={false}>
            <Dialog.Title>You have already joined or hosted an event :(</Dialog.Title>
            <Dialog.Content><Text>Check My Event section in your profile</Text></Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=>{setRepeatCreateDialog(!repeatCreateDialog); ; navigation.navigate('Map')}}>Back to Map</Button>
              <Button onPress={()=>{setRepeatCreateDialog(!repeatCreateDialog); navigation.navigate('Profile')}}>Go to Profile</Button>
            </Dialog.Actions>
          </Dialog>
          {/* Successful create event dialog */}
          <Dialog visible={successCreateDialog} onDismiss={()=>setSuccessCreateDialog(!successCreateDialog)} dismissable={false}>
            <Dialog.Title>Successful create an event :)</Dialog.Title>
            <Dialog.Content><Text>Now you can navigate to map or profile to see the event you just created</Text></Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=>{setSuccessCreateDialog(!successCreateDialog) ; navigation.navigate('Map')}}>Back to Map</Button>
            </Dialog.Actions>
          </Dialog>

        </SafeAreaView>
    );
}

export default EventPage;
