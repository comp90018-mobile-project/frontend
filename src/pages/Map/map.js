/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Navigator from '../../components/navigator/navigator';
import EventCard from './components/eventCard/eventCard';
import styles from './mapStyles';

function Map(navigation) {
  const { events } = useSelector((state) => state.event);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventCard, setEventCard] = useState(false);

  const handleEventCard = (event) => {
    setSelectedEvent(event);
    setEventCard(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: -37.8033,
          longitude: 144.9610,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >

        {events.map((item) => (
          <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
            <Image
              style={{
                width: 35, height: 35, borderRadius: 20, resizeMode: 'contain',
              }}
              source={require('../../../assets/avatar.png')}
            />
            <Callout tooltip="true" onPress={() => handleEventCard(item)}>
              { item.participants.length ? (
                <View style={styles.callout}>
                  <FontAwesome name="group" size={25} color="#248A59" />
                  <Text style={styles.calloutText}>
                    {item.participants.length}
                    /
                    {item.settings.num_of_participants}
                  </Text>
                </View>
              )
                : (
                  <View style={styles.callout} onPress={() => navigation.replace('EventPage')}>
                    <AntDesign name="addusergroup" size={30} color="#248A59" />
                    <Text style={styles.calloutText} />
                  </View>
                )}
            </Callout>
          </Marker>
        ))}
      </MapView>

      <EventCard show={eventCard} eventInfo={selectedEvent} onPress={() => navigation.replace('EventPage')} />

      <Navigator />

    </View>
  );
}

export default Map;
