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

// Show the photos that exist in an album.
export const getAlbumFiles = async (album: string) => {
  const albumPhotosKey = encodeURIComponent(album) + "/";

  try {
    const data = await s3
      .listObjects({ Prefix: albumPhotosKey, Bucket })
      .promise();

    const href = "https://nana-media.s3.amazonaws.com/";

    const photos = data.Contents?.map(function (photo) {
      const photoKey = photo.Key;
      return photoKey ? href + photoKey : undefined;
    }).filter((x) => !!x && x !== `${href}${album}/`);

    return { album, photos };
  } catch (err) {
    return alert("There was an error viewing your album: " + err.message);
  }
};

export const getAll = async () => {
  try {
    const list = await listAlbums();

    if (!list) throw Error("Failed to get list");

    const promiseFns = list.albums.map((x) => getAlbumFiles(x));

    const photos = (await Promise.allSettled(promiseFns))
      .filter((x) => x.status === "fulfilled")
      // @ts-ignore
      .map((x) => x.value);

    console.log(photos);

    return photos;
  } catch (err) {
    throw new Error(err);
  }
};
