/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect } from 'react';
import { SafeAreaView, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './eventPageStyles';

function EventPage() {
  const [eventCreater, setCreater] = useState('Nine1ie');
  const [eventName, setName] = useState('');
  const [eventDuration, setDuration] = useState('');
  

  return (
    <SafeAreaView style={styles.root}>
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
            <DateTimePicker style={{width: 150, height: 40}} 
            mode={'time'} display='clock' value={new Date()} is24Hour={true}/>
          </View>
          <View style={styles.settingItem}>
            <Text>Duration</Text>
            <Picker
              style={{height: 50, width: 100}}
              selectedValue={eventDuration}
              onValueChange={(itemValue, itemIndex) =>
                setDuration(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          <View style={styles.settingItem}>
            <Text>Max & Min Participants</Text>
            <Text style={styles.settingItemContent}>5 - 7</Text>
          </View>
          <View style={styles.settingItem}>
            <Text>Type</Text>
            <Text style={styles.settingItemContent}>Event Type</Text>
          </View>
          <View style={styles.settingItem}>
            <Text>Description</Text>
            <View><Text>EventEventEventEventEventEvent</Text></View>
          </View>

        </View>
      </View>

      <View style={styles.imgContainer}>
        <Text style={styles.titleFont}>Images</Text>
        <Image style={{width: '100%', height: 200, borderRadius: 15,}}
          source={require('../../../../../assets/location.png')}/>
      </View>

      <TouchableOpacity style={styles.createButton}>
        <Text style={{fontSize: 12, color: "#fff", fontWeight: "bold", alignSelf: "center", textTransform: "uppercase"}}>
          Create
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default EventPage;
