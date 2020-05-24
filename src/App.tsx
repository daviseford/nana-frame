import "core-js/stable"; // polyfills
import React, { useEffect, useState } from "react";

import { getSlideshowFiles, IAlbum } from "./creds/aws";
import Album from "./Album";

const getMins = (desired_mins: number) => desired_mins * 1000 * 60

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
  const [run, setRun] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const data = await getSlideshowFiles();
      if (data) setAlbum(data);

      if (!run) return;
      setTimeout(() => setRun(true), getMins(1));
      setRun(false);
    };
    if (run) fn();
  }, [run]);

  console.log(album);

  return (
    <>
      <Album album={album} />

      {(!album || !album.photos.length) && <Error />}
    </>
  );
}

export default App;
