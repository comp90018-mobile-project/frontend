import React from 'react';
import { Text, Button, View } from 'react-native';
import { userApi } from '../../services/user';

const RtkQueryPage = ({ navigation }) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = userApi.endpoints.usersGet.useQuery();

  return (
    <View>
      <Button
        title={'Go home'}
        onPress={() => navigation.navigate('Home')}/>
      <Text>RTK Query Demo</Text>
      {isSuccess && data["data"].map((s, index) => (
        <View key={index}>
          <Text>{s.username}</Text>
          <Text>{s._id}</Text>
        </View>
        ))}
    </View>
  );
};

export default RtkQueryPage;
