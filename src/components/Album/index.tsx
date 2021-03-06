import React, { useEffect, useState } from "react";
import { sample } from "lodash";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import "./Album.css";
import listOfBgColors from "../../style/bgColors";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const NoUrlsFound = () => {
  return (
    <div>
      <div className={"def-error"}>
        No pictures found yet.
        <br />
        <br />
        We love you Nana!
      </div>
    </div>
  );
};

const Album: React.FC<{ photos?: string[] }> = ({ photos }) => {
  const [urls, setUrls] = useState([] as string[] | undefined);

  // When we get a new photo, we want to display it immediately.
  useEffect(() => {
    if (photos?.length !== urls?.length) {
      setUrls(undefined);
      setTimeout(() => setUrls(photos), 100);
    }
  }, [photos, urls]);

  if (!urls?.length) return <NoUrlsFound />;

  return (
    <div>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={5000}
        fillParent={true}
        buttons={false}
      >
        {urls.map((url) => (
          <div
            data-src={url}
            style={{ backgroundColor: sample(listOfBgColors) }}
            key={url}
          />
        ))}
      </AutoplaySlider>
    </div>
  );
};

export default Album;
