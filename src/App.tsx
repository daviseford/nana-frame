import 'core-js/stable' // polyfills
import React, { useEffect, useState } from "react";

import { getSlideshowFiles, IAlbum } from "./creds/aws";
import Album from "./Album";

const Error = () => {
  return (
    <div className={"def-error"}>
      No pictures found.
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
      setTimeout(() => setRun(true), 10000);
      setRun(false);
    };
    if (run) fn();
  }, [run]);

  console.log(album);

  return (
    <>
      <Album album={album} />

      {(!album || !album.photos.length) && <Error />}

      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </>
  );
}

export default App;
