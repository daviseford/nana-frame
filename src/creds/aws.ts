import AWS from "aws-sdk";

// Initialize the Amazon Cognito credentials provider
const initAWSCreds = () => {
  AWS.config.region = "us-east-1"; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:3a445c96-1f34-4459-b18c-91f99b16cbf4",
  });
};
