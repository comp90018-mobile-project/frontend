// create stylesheet
import { StyleSheet } from 'react-native';

// create styles
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#323C47',
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleFont: {
    color: '#fff',
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 10
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginTop: 50
  },
  previewImg: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderColor: '#d9d9d9'
  },
  headerText: {
    fontSize: 36,
    marginLeft: 15,
    flexShrink: 1
  },
  participantContainer: {
    width: '90%',
    marginTop: 10,
  },
  participantList: {
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingContainer: {
    width: '90%',
    marginTop: 10,
    flexDirection: 'column'
  },
  settingList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center'
  },
  settingItem: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  settingItemContent: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  imgContainer: {
    width: '90%',
    marginTop: 10,
  },
  createButton: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
// above new style


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
