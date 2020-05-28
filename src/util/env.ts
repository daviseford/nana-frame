const ENV = {
    BUCKET: process.env.REACT_APP_BUCKET as string,
    BUCKET_HREF: process.env.REACT_APP_BUCKET_HREF as string,
    BUCKET_PREFIX: process.env.REACT_APP_BUCKET_PREFIX || undefined,
    COGNITO_IDENTITY: process.env.REACT_APP_COGNITO_IDENTITY || undefined,
    REGION: process.env.REACT_APP_REGION as string,
}

export default ENV
