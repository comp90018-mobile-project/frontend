/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { async } from '@firebase/util';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { Button, Dialog, Searchbar } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Navigator from '../../components/navigator/navigator';
import { fetchEvents, fetchEvent } from '../../services/api';
import EventCard from './components/eventCard/eventCard';
import styles from './mapStyles';

function Map({ navigation }) {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const user  = useSelector((state) => state.user);
  const [initialRegion, setInitialRegion] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [eventCard, setEventCard] = useState(false);
  const [region, setRegion] = useState();
  const [dialog, setDialog] = useState(false);
  const [pressCoordinate, setPressCoordinate] = useState();
  const {eventDisplay} = useSelector((state)=>state.event)

  useEffect(() => {
    dispatch(fetchEvents());
    console.log("加载")
  }, [user]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion(address.shift().city);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const handleEventCard = (event) => {
    setSelectedEvent(event);
    setEventCard(true);
  };

  const handleEventCardClose = () => {
    setEventCard(false);
  };

  const handleDialogOpen = () => {
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const handleSearch = (text) => {
    const filteredEvents = events.filter((event) => event.name.includes(text));
    // eslint-disable-next-line no-unused-expressions
    (text.length && filteredEvents.length) ? handleEventCard(filteredEvents.shift()) : handleEventCardClose();
  };

  const handleCreateEventDialog = () => {
    handleDialogOpen();
  };

  const handleCreateEvent = () => {
    handleDialogClose();
    navigation.navigate('EventPage', { lat: pressCoordinate.latitude, lon: pressCoordinate.longitude });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={initialRegion}
        onDoublePress={(e) => {
          const location = e.nativeEvent.coordinate;
          setPressCoordinate(location);
          handleCreateEventDialog();
        }}
      >
        {console.log('theabc', events)}
        {events.map((item) => (
          item.active != 'ended' &&
          <Marker key={item._id} coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
            {
              item.preview != '' ? (
                item.active === 'started' ? (
                  <Image
                  style={{width: 35, height: 35, borderRadius: 20, resizeMode: 'contain', borderWidth: 1, borderColor: '#248A59'}}
                  source={{uri: item.preview}}/>
                ):(
                  <Image
                  style={{width: 35, height: 35, borderRadius: 20, resizeMode: 'contain', borderWidth: 1, borderColor: '#e6b400'}}
                  source={{uri: item.preview}}/>
                )
              ) : (
                item.active === 'started' ? (
                  <FontAwesome name='group' size={30} color='#248A59' />
                ):(
                  <FontAwesome name='group' size={30} color='#e6b400' />
                )
              )
            }
            <Callout tooltip="true">
              <View style={styles.callout}>
                <FontAwesome name="group" size={25} color="#248A59" onPress={async() => {
                  await dispatch(fetchEvent(item._id));
                  navigation.navigate('EventDisplay', eventDisplay);
                }}/>
                <Text style={styles.calloutText}>
                  {console.log("item.participants", item.participants)}
                  {item.participants.length}
                  /
                  {item.settings.max_participant} 
                </Text>
                <Entypo name="direction" size={25} color="#248A59" style={styles.directionIcon} onPress={() => { 
                  // concatenate latitude and longitude with comma as a string
                  const latlon = item.latitude + ',' + item.longitude;
                  openMap({provider: 'google', query: latlon})}}/>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.infoDisplay}>
        <View style={styles.regionCard}>
          
          <Text style={styles.regionText}>{region ? region : 'Welcome'}</Text>
          <Image
            style={styles.regionFire}
            source={require('../../../assets/fire.png')}
          />
        </View>

        <Searchbar
          style={styles.searchBar}
          placeholder="Search Event"
          onChangeText={(text) => handleSearch(text)}
        />

      </View>

      <EventCard show={eventCard} eventInfo={selectedEvent} navigation={navigation} />

      <Navigator navigation={navigation} />

      <Dialog visible={dialog} onDismiss={handleDialogClose}>
        <Dialog.Title>Do you want to create an event?</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={handleCreateEvent}>Create</Button>
          <Button onPress={handleDialogClose}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>

    </SafeAreaView>
  );
}

export default Map;
