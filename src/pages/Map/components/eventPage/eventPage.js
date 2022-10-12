/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect} from 'react';
import { SafeAreaView, Image, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../../../services/api';
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './eventPageStyles';

function EventPage() {
  const [eventCreater, setCreater] = useState('Nine1ie');
  const [eventName, setName] = useState('');
  const [eventDuration, setDuration] = useState('');
  const [eventMinParticipant, setMinParticipant] = useState('');
  const [eventMaxParticipant, setMaxParticipant] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const durationOption = [
    {key: 1, label: '30 mins', value: 30},
    {key: 2, label: '1 hour', value: 60},
    {key: 3, label: '1 hour 30mins', value: 90},
    {key: 4, label: '2 hours', value: 120},
    {key: 5, label: '2 hours 30mins', value:150},
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
  
  return (
    <ScrollView style={{backgroundColor: '#323C47'}}>
      <View style={styles.root} >
        <View style={styles.header}>
          <MaterialCommunityIcons name="file-image-plus-outline" style={styles.previewImg} size={130} />
          <View style={styles.headerText}>
            <TextInput style={styles.eventNameFont} 
            onChange={(value) => setName(value)}
            value={eventName} 
            placeholderTextColor={'#fff'} 
            placeholder='Event Name'/>
            <Text style={{color: '#fff', fontSize: 16}}>Host Name</Text>
          </View>
        </View>

        <View style={styles.participantContainer}>
          <Text style={styles.titleFont}>Participants</Text>
          <View style={styles.participantList}>
            <Image style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}}
                  source={require('../../../../../assets/avatar.png')}/>
            <Image style={{width: 40, height: 40, borderWidth: 1, borderRadius: 20, margin: 5}}
                  source={require('../../../../../assets/avatar.png')}/>
          </View>
        </View>

        <View style={styles.settingContainer}>
    
          <Text style={styles.titleFont}>Settings</Text>

          <View style={styles.settingList}>

            <View style={styles.settingItem}>
              <Text>Start Time</Text>
              <DateTimePicker 
                style={{width: 150, height: 40}} 
                mode={'time'} 
                display='clock' 
                value={new Date()} 
                is24Hour={true}
              />
            </View>

            <View style={styles.settingItem}>
              <Text>Duration</Text>
              <ModalSelector 
                data={durationOption} 
                onChange={(option) => {setDuration(option.label)}}>
                  <TextInput
                    style={styles.settingItemContent}
                    editable={false}
                    placeholder="Set duration"
                    value={eventDuration} />
              </ModalSelector>
            </View>

            <View style={styles.settingItem}>
              <Text>Min & Max Participants</Text>
              <View style={{flexDirection: 'row'}}>
                <ModalSelector 
                  data={participantOption} 
                  onChange={(option) => {setMinParticipant(option.label)}}>
                    <TextInput
                      style={styles.settingItemContent}
                      editable={false}
                      placeholder="Min"
                      value={eventMinParticipant} />
                </ModalSelector>
                {eventMinParticipant && eventMaxParticipant != '' ?
                  <Text style={{fontSize: 24, fontWeight: 'bold'}}> - </Text>
                  :
                  <Text style={{fontSize: 24, fontWeight: 'bold', color: '#c5c5c5'}}> - </Text>

                }
                <ModalSelector 
                  data={participantOption} 
                  onChange={(option) => {setMaxParticipant(option.label)}}>
                    <TextInput
                      style={styles.settingItemContent}
                      editable={false}
                      placeholder="Max"
                      value={eventMaxParticipant} />
                </ModalSelector>
              </View>
            </View>

            <View style={styles.settingItem}>
              <Text>Type</Text>
              <ModalSelector 
                  data={typeOption} 
                  onChange={(option) => {setEventType(option.label)}}>
                    <TextInput
                      style={styles.settingItemContent}
                      editable={false}
                      placeholder="Set type"
                      value={eventType} />
                </ModalSelector>
            </View>

            <View style={styles.settingItem}>
              <Text>Description</Text>
              <View style={{width: '50%'}}>
                <TextInput 
                multiline={true} 
                numberOfLines={4}
                value={eventDescription}
                onChangeText={(value)=>{setEventDescription(value)}}
                placeholder={'Description of your event'}/>
              </View>
            </View>

          </View>
        </View>

        <View style={styles.imgContainer}>
          <Text style={styles.titleFont}>Images</Text>
          <Image style={{width: '100%', height: 200, borderRadius: 15,}}
            source={require('../../../../../assets/location.png')}/>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={async()=> {await createEvent()}}>
          <Text style={{fontSize: 12, color: "#fff", fontWeight: "bold", alignSelf: "center", textTransform: "uppercase"}}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EventPage;
