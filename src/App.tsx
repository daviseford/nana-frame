import "core-js/stable"; // polyfills
import React, { useState, useEffect } from "react";

import { getFiles } from "./creds/aws";
import useInterval from "./hooks/useInterval";
import Album from "./Album";
import "./index.css";

const getMins = (desired_mins: number) => desired_mins * 1000 * 60;

const Error = () => {
  return (
    <div className={"def-error"}>
      No pictures found yet.
      <br />
      <br />
      We love you Nana!
    </div>
  );
};

function App() {
  const [urls, setUrls] = useState<string[] | undefined>(undefined);
  const updateInterval = getMins(1);

  // Fetch pictures on first load (only run once)
  useEffect(() => {
    const fn = async () => {
      const data = await getFiles("uploads/");
      if (data) setUrls(data);
    };
    fn();
    // eslint-disable-next-line
  }, []);

  // Check for new pictures regularly
  useInterval(() => {
    const fn = async () => {
      const data = await getFiles("uploads/");
      if (data) setUrls(data);
      console.log(
        `Just checked for updates. Next update in ${updateInterval} minutes.`
      );
    };
    fn();
  }, updateInterval);

  return (
    <div>
      <Album photos={urls} />
      {(!urls || !urls.length) && <Error />}
    </div>
  );
}

export default App;
