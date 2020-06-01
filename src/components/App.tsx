import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { getUrlsFromBucket } from "../util/aws";
import useInterval from "../hooks/useInterval";
import Album from "./Album";
import Admin from "./Admin";

const getMins = (desired_mins: number) => desired_mins * 1000 * 60;

const MINS_BETWEEN_UPDATE = 1;

const App = () => {
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
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin urls={urls} />
        </Route>
        <Route path="/">
          <Album photos={urls} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
