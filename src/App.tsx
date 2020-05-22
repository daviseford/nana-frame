import React, { useEffect, useState } from "react";

import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import { getAll } from "./creds/aws";
import AwesomeSlider from "react-awesome-slider";

interface IAlbum {
  album: string; // album name
  photos: string[]; // urls
}

function App() {
  const [albums, setAlbums] = useState([] as IAlbum[]);
  const [run, setRun] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const data = await getAll();
      if (data) setAlbums(data);

      // TODO: Add timer to refresh
      if (run) return;
      setTimeout(() => setRun(true), 10000);
      setRun(false);
    };
    if (run) fn();
  }, [run]);

  console.log(albums);

  return (
    <div>
      {albums.length && <Album {...albums[0]} />}

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
    </div>
  );
}

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Album: React.FC<IAlbum> = ({ album, photos }) => {
  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={3000}
    >
      {photos.map((p) => (
        <div data-src={p} key={p} />
      ))}
    </AutoplaySlider>
  );
};

export default App;
