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
    position: 'relative'
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
  regionCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#d9d9d9',
    backgroundColor: '#323C47',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  regionText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff'
  },
  regionFire: {
    height: 40,
    width: 30,
    resizeMode:'stretch'
  },
  searchBar: {
    marginTop: 10,
    borderRadius: 15,
  },
  
  infoDisplay: {
    width: '95%',
    position: 'absolute',
    top: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  // regionCard: {
  //   position: 'absolute',
  //   bottom: 660,
  //   width: '100%',
  //   height: 80,
  //   flex: 1,
  //   flexDirection: 'row',
  //   left: 20,
  // },
  // regionText: {
  //   fontSize: 40,
  //   fontWeight: 'bold',
  //   textDecorationLine: 'underline',
  //   marginLeft: 5,
  //   top: 15,
  //   textAlign: 'left',
  // },
  // regionFire: {
  //   height: 30,
  //   width: 30,
  //   top: 25,
  //   left: 10,
  // },
});
