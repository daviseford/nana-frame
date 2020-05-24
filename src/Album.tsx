import React, { useMemo } from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import "./Album.css";
import { IAlbum } from "./creds/aws";
import { sample } from "lodash";
import listOfBgColors from "./style/bgColors";

const AutoplaySlider = withAutoplay(AwesomeSlider);

interface IWithColor {
  [url: string]: string;
}

const Album: React.FC<{ album?: IAlbum }> = ({ album }) => {
  const data: IWithColor = useMemo(() => {
    if (!album?.photos.length) return {};
    return album.photos.reduce((a, url) => {
      a[url] = sample(listOfBgColors);
      return a;
    }, {});
  }, [album]);

  if (!album?.photos.length) return <></>;

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false}
      interval={3000}
      fillParent={true}
      buttons={false}
      // media={album.photos.map((source) => ({ source }))}
    >
      {Object.keys(data).map((url) => (
        <div data-src={url} style={{ backgroundColor: data[url] }} />
      ))}
    </AutoplaySlider>
  );
};

export default Album;
