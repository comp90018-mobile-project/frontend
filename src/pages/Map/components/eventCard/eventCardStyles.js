// create stylesheet
import { StyleSheet } from 'react-native';

// create styles
const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 560,
    width: '95%',
    height: 80,
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
    marginHorizontal: 25,
    top: 10,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    top: 15,
  },
  stateText: {
    color: '#F19100',
    fontSize: 15,
    fontWeight: 'bold',
    left: 40,
  },
  placementText: {
    color: '#F19100',
    fontSize: 35,
    fontWeight: 'bold',
    left: 210,
    bottom: 25,
  },

});

// export styles
export default styles;
