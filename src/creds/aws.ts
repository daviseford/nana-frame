import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { sortBy } from "lodash";

const Bucket = "nana-media";
const Region = "us-east-1";
// Initialize the Amazon Cognito credentials provider
AWS.config.region = Region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:3a445c96-1f34-4459-b18c-91f99b16cbf4",
});

// Create a new service object
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket },
});

export interface IAlbum {
  photos: string[]; // urls
}

type TData = PromiseResult<AWS.S3.ListObjectsV2Output, AWS.AWSError>;

let truncatedData: TData[] = [];

const truncatedMapper = (x: typeof truncatedData): TData["Contents"][] => {
  return x.map((y) => y.Contents).filter((z) => !!z);
};

const getTruncated = async (data: TData): Promise<TData["Contents"][]> => {
  const {
    Prefix,
    NextContinuationToken: ContinuationToken,
    IsTruncated,
  } = data;

  if (!IsTruncated || !ContinuationToken) return truncatedMapper(truncatedData);

  try {
    const newData = await s3
      .listObjectsV2({ Prefix, Bucket, ContinuationToken })
      .promise();

    if (!newData || !newData.Contents) return truncatedMapper(truncatedData);

    truncatedData.push(newData);
    return getTruncated(newData);
  } catch (err) {
    console.log(err);
    return truncatedMapper(truncatedData);
  }
};

// Show the photos that exist in an album.
export const getSlideshowFiles = async (): Promise<IAlbum | void> => {
  const imgPath = "uploads/";
  const href = "https://nana-media.s3.amazonaws.com/";
  try {
    const data = await s3
      .listObjectsV2({ Prefix: imgPath, Bucket, MaxKeys: 1000 })
      .promise();
    const truncatedEntries = await getTruncated(data);

    if (!data.Contents) throw new Error();

    const contents = [data.Contents, ...truncatedEntries].flat();

    const photos = sortBy(
      contents
        .map((photo) => (photo ? href + photo.Key : ""))
        .filter((x) => x !== "" && x !== href + imgPath)
    ).reverse();

    return { photos };
  } catch (err) {
    return console.error(
      "There was an error viewing your album: " + err.message
    );
  }
};
