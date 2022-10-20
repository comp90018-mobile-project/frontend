import React, {useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Amplify, Storage } from 'aws-amplify';

export default function PictureBed({navigation}) {
    const [image, setImage] = useState(null);
    Amplify.configure({
        Auth: {
            identityPoolId: "ap-northeast-1:1e84fbb8-71fe-42ac-8a59-1a2be3582164", //REQUIRED - Amazon Cognito Identity Pool ID
            region: 'ap-northeast-1', // REQUIRED - Amazon Cognito Region
        },
        Storage: {
            AWSS3: {
                bucket: 'elasticbeanstalk-ap-southeast-2-065755014425', //REQUIRED -  Amazon S3 bucket name
                region: 'ap-southeast-2', //OPTIONAL -  Amazon service region
            }
        }
    });
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        let uri = result.uri;
        const response = await fetch(uri);
        const tempFileName = uri.split('/').pop();
        const blob = await response.blob();
        result = await Storage.put(tempFileName, blob, {
            level: 'public',
            acl: "public-read"
        });
        const filename = result.key
        uri = "https://elasticbeanstalk-ap-southeast-2-065755014425.s3.ap-southeast-2.amazonaws.com/public/"
        uri = uri + filename
        setImage(`${uri}`);

    }

    return (
        <View>
            <Text>
                Uploads file
            </Text>
            <TouchableOpacity
                onPress={pickImage}
                // style={styles.button}
            >
                <Text>Upload</Text>
                
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
