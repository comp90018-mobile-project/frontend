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
  searchBar: {
    position: 'absolute',
    bottom: 600,
    width: '90%',
    borderRadius: 20,
  },
  regionCard: {
    position: 'absolute',
    bottom: 660,
    width: '100%',
    height: 80,
    flex: 1,
    flexDirection: 'row',
    left: 20,
  },
  regionText: {
    fontSize: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 5,
    top: 15,
    textAlign: 'left',
  },
  regionFire: {
    height: 30,
    width: 30,
    top: 25,
    left: 10,
  },
});
