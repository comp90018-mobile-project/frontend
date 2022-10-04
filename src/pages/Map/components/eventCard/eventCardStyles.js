// create stylesheet
import { StyleSheet } from 'react-native';

// create styles
const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    height: 150,
  },
  popupContainer: {
    backgroundColor: '#323C47',
    flex: 1,
    borderRadius: 15,
  },
  eventName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 30,
    top: 25,
    // place text in the center
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    top: 50,
  },
  stateText: {
    color: '#F19100',
    fontSize: 20,
    fontWeight: 'bold',
    left: 40,
  },
  placementText: {
    color: '#F19100',
    fontSize: 30,
    fontWeight: 'bold',
    left: 130,
    bottom: 5,
  },

});

// export styles
export default styles;
