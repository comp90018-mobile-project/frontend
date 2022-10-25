import { useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EventHistoryCard from './components/eventHitstoryCard';

function Profile() {
  const [userName, setName] = useState('Nine1ie')
  const [userAvatar, setAvatar] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={{width: 130, height: 130, borderWidth: 1, borderRadius: 100}}
        source={require('../../../assets/avatar.png')}/>
        <Text style={{fontSize: 36, fontWeight: 'bold', marginLeft: 20}}>{userName}</Text>
      </View>
      
      <View style={styles.covidwarning}>
        <Text style={{alignSelf: 'flex-start', fontSize: 24,
          textDecorationLine: 'underline'}}>Covid Exposure
        </Text>
        
        <View style={{width: '100%', height: 100, marginVertical: 10, 
        backgroundColor: 'green', borderRadius: 20, padding: 10}}>
          <Text>You are all good</Text>
        </View>
      </View>

      <View style={styles.historys}>
        <Text style={{alignSelf: 'flex-start', fontSize: 24,
        textDecorationLine: 'underline'}}>Event History
        </Text>

        <ScrollView style={{width: '100%', height: 400}}>
          <View style={styles.historyCards}>
            <EventHistoryCard props={{eventName: 'abc', eventDuration: '60'}}/>
            <EventHistoryCard props={{eventName: 'Hello', eventDuration: '80'}}/>
            <EventHistoryCard props={{eventName: 'Nihao', eventDuration: '80'}}/>
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
  }
})