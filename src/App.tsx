import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { listAlbums, getAll } from "./creds/aws";

function App() {
  const [albums, setAlbums] = useState([] as string[]);
  const [run, setRun] = useState(true);

  useEffect(() => {
    getAll()
  })

  // useEffect(() => {
  //   const fn = async () => {
  //     const albs = await listAlbums();
  //     if (albs) setAlbums(albs.albums);

  //     // TODO: Add timer to refresh
  //     if (!run) {
  //       setTimeout(() => setRun(true), 10000);
  //       setRun(false);
  //     }
  //   };
  //   if (run) fn();
  // }, [run]);

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
