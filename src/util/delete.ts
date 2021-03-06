import axios from "axios";
import ENV from "./env";

const delImage = async (url: string) => {
  try {
    const Key = url.replace(ENV.BUCKET_HREF, "").trim()
    const request = {
      Bucket: ENV.BUCKET,
      Key,
      access_key: ENV.API_ACCESS_KEY,
    };

    const res = await axios.post(`${ENV.API_URL}/delete_image`, request);

    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

export default delImage;
