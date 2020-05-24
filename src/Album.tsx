import React from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import "./Album.css";
import { IAlbum } from "./creds/aws";

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
      className="bgColor"
      media={album.photos.map((source) => ({ source }))}
    />
  );
};

export default Album;
