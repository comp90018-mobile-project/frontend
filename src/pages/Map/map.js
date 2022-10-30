/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  Image, SafeAreaView, Text, View
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Button, Dialog, Searchbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Navigator from '../../components/navigator/navigator';
import { fetchEvents } from '../../services/api';
import EventCard from './components/eventCard/eventCard';
import styles from './mapStyles';

function Map({ navigation }) {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const [initialRegion, setInitialRegion] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [eventCard, setEventCard] = useState(false);
  const [region, setRegion] = useState();
  const [dialog, setDialog] = useState(false);
  const [pressCoordinate, setPressCoordinate] = useState();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

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
        {events.map((item) => (

          <Marker key={item._id} coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
            <Image
              style={{
                width: 35, height: 35, borderRadius: 20, resizeMode: 'contain',
              }}
              source={require('../../../assets/avatar.png')}
            />
            <Callout tooltip="true">
              { item.participants ? (
                <View style={styles.callout}>
                  <FontAwesome name="group" size={25} color="#248A59" />
                  <Text style={styles.calloutText}>
                    {item.participants.length}
                    /
                    {item.settings.max_participant} 
                  </Text>
                </View>
              )
                : (
                  <View style={styles.callout} onPress={() => navigation.navigate('EventPage')}>
                    <AntDesign name="addusergroup" size={30} color="#248A59" onPress={() => navigation.navigate('EventPage')} />
                    <Text style={styles.calloutText} />
                  </View>
                )}
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

      <EventCard show={eventCard} eventInfo={selectedEvent} onPress={() => navigation.replace('EventPage')} />

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
