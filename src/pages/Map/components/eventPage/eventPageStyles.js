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
  eventNameFont: {
    color: '#fff', 
    fontSize: 36, 
    fontWeight: 'bold'
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
    alignItems: 'center',
    padding: 10
  },
  settingItem: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

// export styles
export default styles;
