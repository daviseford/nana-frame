const ENV = {
  BUCKET: process.env.REACT_APP_BUCKET as string,
  BUCKET_HREF: process.env.REACT_APP_BUCKET_HREF as string,
  BUCKET_PREFIX: process.env.REACT_APP_BUCKET_PREFIX as string,
  COGNITO_IDENTITY: process.env.REACT_APP_COGNITO_IDENTITY as string,
  REGION: process.env.REACT_APP_REGION as string,
};

console.log("ENV", ENV);

export default ENV;
