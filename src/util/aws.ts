import AWS from "aws-sdk";
import { sortBy } from "lodash";
import type { PromiseResult } from "aws-sdk/lib/request";
import ENV from "./env";

const Bucket = ENV.BUCKET;
const MaxKeys = 1000;

AWS.config.region = ENV.REGION;

// Initialize the Amazon Cognito credentials provider (optional)
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: ENV.COGNITO_IDENTITY,
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

  // If we're done fetching, return the data
  if (!IsTruncated || !ContinuationToken) {
    const mappedData = truncatedMapper(truncatedData);
    truncatedData = []; // Clear our array
    return mappedData;
  }

  try {
    const newData = await s3
      .listObjectsV2({ Prefix, Bucket, ContinuationToken, MaxKeys })
      .promise();

    // If we didn't get anything, return the existing data
    if (!newData || !newData.Contents) {
      const mappedData = truncatedMapper(truncatedData);
      truncatedData = []; // Clear our array
      return mappedData;
    }

    truncatedData.push(newData);
    return getTruncated(newData);
  } catch (err) {
    console.log(err);
    return truncatedMapper(truncatedData);
  }
};

// Returns a list of URLs from our bucket
export const getUrlsFromBucket = async (): Promise<string[] | void> => {
  try {
    const Prefix = ENV.BUCKET_PREFIX;

    const data = await s3.listObjectsV2({ Prefix, Bucket, MaxKeys }).promise();
    const truncatedEntries = await getTruncated(data);

    if (!data.Contents) throw new Error("Missing data.Contents!");

    const contents = [data.Contents, ...truncatedEntries].flat();

    // Sort newest -> oldest
    const entries = sortBy(
      contents
        .map((x) => (x ? `${ENV.BUCKET_HREF}${x.Key}` : ""))
        .filter((x) => x !== "" && x !== `${ENV.BUCKET_HREF}${Prefix}`)
    ).reverse();

    return entries;
  } catch (err) {
    console.error("There was an error viewing your bucket: " + err.message);
    return [];
  }
};
