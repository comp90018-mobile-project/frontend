// create stylesheet
import { StyleSheet } from 'react-native';

// create styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#323C47',
  },
  headContainer: {
    position: 'absolute',
    flex: 1,
    top: 60,
    height: 150,
    width: '100%',
  },
  eventImage: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    position: 'absolute',
    top: 20,
    left: 40,
  },
  eventName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 30,
    marginVertical: 10,
    left: 150,
    top: 20,
  },
  participantsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 220,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  settings: {
    position: 'absolute',
    top: 300,
    width: '90%',
    height: 150,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  settingsDuration: {
    color: 'black',
    fontSize: 15,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  settingsDescription: {
    color: 'black',
    fontSize: 15,
    marginHorizontal: 15,
  },
  images: {
    width: '90%',
    height: '30%',
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    top: 480,
    borderRadius: 15,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#248A59',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
  button: {
    position: 'absolute',
    width: '90%',
    height: 50,
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#248A59',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
    marginVertical: 12,
    textAlign: 'center',
  },

});

// export styles
export default styles;
