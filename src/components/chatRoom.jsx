import {
  Image, StyleSheet, Text, View
} from 'react-native';
import '../../assets/defaultChat.png';

export default function ChatRoom(props) {
  const {
    id, eventName, num, image, theme,
  } = props;

  return (
    <View style={styles.container}>
      <View style={{ width: '20%' }}>
        {image == ''
          ? <Image style={styles.tinyLogo} source={require('../../assets/defaultChat.png')} />
          : <Image style={styles.tinyLogo} source={{ uri: image }} />}
      </View>
      <View style={{ width: '80%' }}>
        <Text style={styles.buttonText}>
          {eventName}
          {' '}
          -
          {theme}
        </Text>
        {num.length == 1 ? (
          <Text>
            {num.length}
            {' '}
            participant
          </Text>
        ) : (
          <Text>
            {num.length}
            {' '}
            participants
          </Text>
        ) }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,

  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
