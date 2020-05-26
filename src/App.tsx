import "core-js/stable"; // polyfills
import React, { useState, useEffect } from "react";

import {  getFiles } from "./creds/aws";
import useInterval from "./hooks/useInterval";
import Album from "./Album";
import './index.css'

// const getSecs = (desired_secs: number) => desired_secs * 1000
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

  // Fetch pictures on first load
  useEffect(() => {
    const fn = async () => {
      const data = await getFiles('uploads/');
      if (data) setUrls(data);
    };
    fn();
    // Only run once
  }, []);

  useInterval(() => {
    const fn = async () => {
      const data = await getFiles('uploads/');
      if (data) setUrls(data);
    };
    fn();
  }, getMins(0.1));

  console.log(urls);

  return (
    <div >
      <Album photos={urls || []} />

      {(!urls || !urls.length) && <Error />}
    </div>
  );
}

export default App;
