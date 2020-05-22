import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { listAlbums, getAll } from "./creds/aws";

interface IAlbum {
  album: string; // album name
  photos: string[]; // urls
}

function App() {
  const [albums, setAlbums] = useState([] as IAlbum[]);
  const [run, setRun] = useState(true);

  // useEffect(() => {
  //   getAll();
  // });

  useEffect(() => {
    const fn = async () => {
      const data = await getAll();
      if (data) setAlbums(data);

      // TODO: Add timer to refresh
      if (run) return 
      setTimeout(() => setRun(true), 10000);
      setRun(false);
    };
    if (run) fn();
  }, [run]);

  console.log(albums);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>
      </header>
    </div>
  );
}

export default App;
