import {Amplify, Storage} from 'aws-amplify';
import {createAsyncThunk} from "@reduxjs/toolkit";

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

/**
 * Uploads an image selected either by camera or from the gallery
 * to Amazon S3 bucket.
 * @param {*} result
 * @returns
 */
export const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const tempFileName = uri.split('/').pop();
    const blob = await response.blob();
    let result = await Storage.put(tempFileName, blob, {
        level: 'public',
        acl: "public-read"
    });
    const filename = result.key
    uri = "https://elasticbeanstalk-ap-southeast-2-065755014425.s3.ap-southeast-2.amazonaws.com/public/"
    uri = uri + filename
    return uri;
}
