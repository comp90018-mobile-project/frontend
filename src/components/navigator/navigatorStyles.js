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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  mapIconContainer: {
    backgroundColor: '#248A59',
    width: 80,
    height: 80,
    borderRadius: 50,
    left: 100,
    bottom: 25,
  },
  mapIcon: {
    color: '#94E858',
    left: 22,
    top: 15,
  },
  profileIcon: {
    color: '#94E858',
    left: 160,
  },
  chatIcon: {
    color: '#94E858',
    left: 50,
  },
});

// export styles
export default styles;
