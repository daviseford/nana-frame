import React, { useState, useEffect } from "react";

import { getUrlsFromBucket } from "../util/aws";
import useInterval from "../hooks/useInterval";
import Album from "./Album";

const getMins = (desired_mins: number) => desired_mins * 1000 * 60;

const NoUrlsFound = () => {
  return (
    <div className={"def-error"}>
      No pictures found yet.
      <br />
      <br />
      We love you Nana!
    </div>
  );
};

const MINS_BETWEEN_UPDATE = 1;

function App() {
  const [urls, setUrls] = useState<string[] | undefined>(undefined);
  const updateInterval = getMins(MINS_BETWEEN_UPDATE);

  // Fetch pictures on first load (only run once)
  useEffect(() => {
    const fn = async () => {
      const data = await getUrlsFromBucket();
      if (data) setUrls(data);
    };
    fn();
    // eslint-disable-next-line
  }, []);

  // Check for new pictures regularly
  useInterval(() => {
    const fn = async () => {
      const data = await getUrlsFromBucket();
      if (data) setUrls(data);
      console.log(
        `Just checked for updates. Next update in ${MINS_BETWEEN_UPDATE} minute${
          MINS_BETWEEN_UPDATE === 1 ? "" : "s"
        }.`
      );
    };
    fn();
  }, updateInterval);

  return (
    <div>
      <Album photos={urls} />
      {(!urls || !urls.length) && <NoUrlsFound />}
    </div>
  );
}

export default App;
