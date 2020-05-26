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

// Returns a list of URLs
export const getFiles = async (s3Path: 'uploads/' | 'json/'): Promise<string[] | void> => {
  const href = "https://nana-media.s3.amazonaws.com/";

  try {
    const data = await s3
      .listObjectsV2({ Prefix: s3Path, Bucket, MaxKeys: 1000 })
      .promise();
    const truncatedEntries = await getTruncated(data);

    if (!data.Contents) throw new Error();

    const contents = [data.Contents, ...truncatedEntries].flat();

    const entries = sortBy(
      contents
        .map((x) => (x ? href + x.Key : ""))
        .filter((x) => x !== "" && x !== href + s3Path)
    ).reverse();

    return entries;
  } catch (err) {
    console.error(
      "There was an error viewing your bucket: " + err.message
    );
    return []
  }
};
