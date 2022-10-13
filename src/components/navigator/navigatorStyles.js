// create stylesheet
import { StyleSheet } from 'react-native';

// create styles
const styles = StyleSheet.create({
  navigatorContainer: {
    position: 'absolute',
    width: '100%',
    height: '10%',
    bottom: 0,
    backgroundColor: '#323C47',
    flexDirection: 'row',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  mapIconContainer: {
    backgroundColor: '#248A59',
    width: 80,
    height: 80,
    borderRadius: 50,
    left: 110,
    bottom: 25,
  },
  mapIcon: {
    color: '#94E858',
    left: 22,
    top: 15,
  },
  profileIcon: {
    color: '#94E858',
    left: 170,
  },
  chatIcon: {
    color: '#94E858',
    left: 60,
  },
});

// export styles
export default styles;
