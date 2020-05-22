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

// Show the photos that exist in an album.
export const getAlbumFiles = async () => {
  const album = "uploads";
  const albumPhotosKey = encodeURIComponent(album) + "/";

  try {
    const data = await s3
      .listObjects({ Prefix: albumPhotosKey, Bucket })
      .promise();

    const href = "https://nana-media.s3.amazonaws.com/";

    const photos = (data.Contents || [])
      .map((photo) => {
        const photoKey = photo.Key;
        return photoKey ? href + photoKey : "";
      })
      .filter((x) => x !== "" && x !== `${href}${album}/`);

    return { album, photos };
  } catch (err) {
    return alert("There was an error viewing your album: " + err.message);
  }
};
