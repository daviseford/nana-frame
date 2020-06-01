import ENV from "./env";
import axios from "axios";

const delImage = async (Key: string) => {
  try {
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
