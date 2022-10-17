// create stylesheet
import { StyleSheet } from 'react-native';

// create styles
const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 450,
    width: '80%',
    height: 120,
  },
  popupContainer: {
    backgroundColor: '#323C47',
    flex: 1,
    borderRadius: 25,
  },
  eventName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 30,
    top: 10,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    top: 40,
  },
  stateText: {
    color: '#F19100',
    fontSize: 20,
    fontWeight: 'bold',
    left: 40,
  },
  placementText: {
    color: '#F19100',
    fontSize: 25,
    fontWeight: 'bold',
    left: 160,
    bottom: 5,
  },

});

// export styles
export default styles;
