import axios from "axios";
import ENV from "./env";

const rotateImage = async (url: string, degree: number) => {
  try {
    const Key = url.replace(ENV.BUCKET_HREF, "").trim()
    const request = {
      Bucket: ENV.BUCKET,
      Key,
      degree,
      access_key: ENV.API_ACCESS_KEY,
    };

    const res = await axios.post(`${ENV.API_URL}/rotate_image`, request);

    console.log(`Rotated image ${degree} degrees`, res);
  } catch (err) {
    console.error(err);
  }
};

export default rotateImage;
