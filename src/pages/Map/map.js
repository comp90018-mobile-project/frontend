/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EventCard from './components/eventCard/eventCard';
import styles from './mapStyles';

function Map(navigation) {
  // useState hook to show event card
  const [eventCard, setEventCard] = useState(false);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: -37.7983,
          longitude: 144.9610,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >

        <Marker
          coordinate={{ latitude: -37.7983, longitude: 144.9610 }}
        >
          <Image
            style={{
              width: 35, height: 35, borderRadius: 20, resizeMode: 'contain',
            }}
            source={require('../../../assets/avatar.png')}
          />
          <Callout tooltip="true" onPress={() => setEventCard(true)}>
            <View style={styles.callout}>
              <FontAwesome name="group" size={25} color="#248A59" />
              <Text style={styles.calloutText}>1/5</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.8033, longitude: 144.9665 }}
        >
          <Image
            style={{
              width: 35, height: 35, borderRadius: 20, resizeMode: 'contain',
            }}
            source={require('../../../assets/avatar.png')}
          />
          <Callout tooltip="true">
            <View style={styles.callout} onPress={() => navigation.replace('EventPage')}>
              <AntDesign name="addusergroup" size={30} color="#248A59" />
              <Text style={styles.calloutText} />
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={{position:'absolute',height:300,width:300,top:0, left:0,backgroundColor:'rgba(0,0,0,0.5)'}}></View>
    </View>
  );
}

export default Map;
