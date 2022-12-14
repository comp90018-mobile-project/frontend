import { Image, StyleSheet, Text, View } from 'react-native';

export default function eventHistoryCard({ props }) {
  const { eventName, eventDuration, eventPreview } = props;
  return (
    <View style={styles.container}>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTxt}>{eventName}</Text>
        <Text style={styles.eventTxt}>{eventDuration}</Text>
      </View>
      {eventPreview != '' ? (
        <Image
          style={{ width: 150, height: 150, borderRadius: 20 }}
          source={{ uri: eventPreview }}
        />
      ) : (
        <Image
          style={{ width: 150, height: 150, borderRadius: 20 }}
          source={require('../../../../assets/location.png')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    height: 150,
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    justifyContent: 'space-between',
    paddingLeft: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  eventInfo: {
    alignSelf: 'center',
  },
  eventTxt: {
    fontSize: 18,
    marginVertical: 10,

  },
});
