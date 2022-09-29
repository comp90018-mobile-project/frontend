/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import {
  Text, View
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import styles from './mapStyles';

function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        >
          <Callout>
            <Text>Event A Info</Text>
          </Callout>
        </Marker>
        <Marker
          coordinate={{ latitude: 37.76825, longitude: -122.4394 }}
        >
          <Callout>
            <Text>Event B Info</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

export default Map;
