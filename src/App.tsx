import "core-js/stable"; // polyfills
import React, { useState, useEffect } from "react";

import { getSlideshowFiles, IAlbum } from "./creds/aws";
import useInterval from "./hooks/useInterval";
import Album from "./Album";
import './index.css'

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
  const [album, setAlbum] = useState<IAlbum | undefined>(undefined);

  // Fetch pictures on first load
  useEffect(() => {
    const fn = async () => {
      const data = await getSlideshowFiles();
      if (data) setAlbum(data);
    };
    fn();
    // Only run once
  }, []);

  useInterval(() => {
    const fn = async () => {
      const data = await getSlideshowFiles();
      if (data) setAlbum(data);
    };
    fn();
  }, getMins(1));

  console.log(album);

  return (
    <div className={""}>
      <Album album={album} />

      {(!album || !album.photos.length) && <Error />}
    </div>
  );
}

export default App;
