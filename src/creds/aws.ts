import AWS from "aws-sdk";

// Initialize the Amazon Cognito credentials provider
AWS.config.region = "us-east-1"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:3a445c96-1f34-4459-b18c-91f99b16cbf4",
});

const Bucket = "nana-media";

// Create a new service object
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket },
});

// List the photo albums that exist in the bucket.
export const listAlbums = async () => {
  try {
    const data = await s3.listObjects({ Delimiter: "/", Bucket }).promise();

    const { CommonPrefixes = {} } = data;

    const albums = Object.keys(CommonPrefixes).map((key) => {
      const prefix = CommonPrefixes[key].Prefix || "";
      const albumName = decodeURIComponent(prefix.replace("/", ""));
      return albumName;
    });

    return { data, albums };
  } catch (err) {
    return alert("There was an error listing your albums: " + err.message);
  }
};
