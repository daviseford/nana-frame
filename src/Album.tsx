import React from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { IAlbum } from "./creds/aws";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Album = (props: { album?: IAlbum }) => {
  if (!props.album) return <>No pictures found.</>;

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={3000}
      animation="scaleOut"
      fillParent={true}
    //   media={props.album.photos.map((p) => ({ source: p }))}
    >
      {props.album.photos.map((p) => (
        <div data-src={p} key={p} />
      ))}
    </AutoplaySlider>
  );
};

export default Album;
