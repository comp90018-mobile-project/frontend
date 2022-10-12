import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  callout: {
    backgroundColor: '#323C47',
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
  },
  calloutText: {
    color: '#248A59',
    fontSize: 20,
    fontWeight: 'bold',
    left: 5,
  },
});
