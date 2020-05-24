import React from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import "./Album.css";
import { IAlbum } from "./creds/aws";
import { sample } from "lodash";
import listOfBgColors from "./style/bgColors";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Album: React.FC<{ album?: IAlbum }> = ({ album }) => {
  if (!album?.photos.length) return <></>;

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false}
      interval={3000}
      animation="scaleOut"
      fillParent={true}
      buttons={false}
      // media={album.photos.map((source) => ({ source }))}
    >
      {album.photos.map((url) => (
        <div
          data-src={url}
          style={{ backgroundColor: sample(listOfBgColors) }}
        />
      ))}
    </AutoplaySlider>
  );
};

export default Album;
