import React, { useEffect, useState } from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import { getAlbumFiles } from "./creds/aws";

interface IAlbum {
  album: string; // album name
  photos: string[]; // urls
}

function App() {
  const [album, setAlbum] = useState<IAlbum | undefined>(undefined);
  const [run, setRun] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const data = await getAlbumFiles();
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

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Album = (props: { album?: IAlbum }) => {
  if (!props.album) return <>No pictures found.</>;

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={3000}
    >
      {props.album.photos.map((p) => (
        <div data-src={p} key={p} />
      ))}
    </AutoplaySlider>
  );
};

export default App;
