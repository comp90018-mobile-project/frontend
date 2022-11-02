import { Amplify, Storage } from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: 'ap-northeast-1:1e84fbb8-71fe-42ac-8a59-1a2be3582164', // REQUIRED - Amazon Cognito Identity Pool ID
    region: 'ap-northeast-1', // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    AWSS3: {
      bucket: 'elasticbeanstalk-ap-southeast-2-065755014425', // REQUIRED -  Amazon S3 bucket name
      region: 'ap-southeast-2', // OPTIONAL -  Amazon service region
    },
  },
});

// uploads an image selected either by camera or from the gallery
export const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const tempFileName = uri.split('/').pop();
  const blob = await response.blob();
  const result = await Storage.put(tempFileName, blob, {
    level: 'public',
    acl: 'public-read',
  });
  const filename = result.key;
  uri = 'https://d1we7cqncdurmu.cloudfront.net/public/';
  uri += filename;
  return uri;
};
