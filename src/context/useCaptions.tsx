import React, { useState, useEffect } from "react";
import { getFiles, getCaptionJson } from "../creds/aws";
import { difference } from "lodash";

export interface ICaption {
  key: string;
  text?: string;
  subject?: string;
  from?: string;
}

interface ICaptionProvider {
  captions: {
    [key: string]: ICaption;
  };
  urls: { [key: string]: string };
  updateCaptionUrls: () => Promise<void>;
}

const CaptionContext = React.createContext<ICaptionProvider | void>(undefined);

const CaptionProvider: React.FC = ({ children }) => {
  const [urls, setUrls] = useState({} as ICaptionProvider["urls"]);
  const [captions, setCaptions] = useState({} as ICaptionProvider["captions"]);

  const updateCaptionUrls = async () => {
    const data = await getFiles("json/");
    if (data) {
      const href = "https://nana-media.s3.amazonaws.com/json/";

      const reduced = data.reduce((a, url) => {
        const filename = url.replace(href, "").replace(".json", "");
        a[filename] = url;
        return a;
      }, {} as ICaptionProvider["urls"]);

      setUrls(reduced);
    }
  };

  useEffect(() => {
    updateCaptionUrls();
    // Only run once
    // @ts-ignore
  }, []);

  useEffect(() => {
    const fn = async () => {
      const missing = difference(Object.keys(urls), Object.keys(captions));
      if (!missing.length) return;

      const fileFns = missing.map((x) => getCaptionJson(x + ".json"));
      const files: ICaption[] = (await Promise.allSettled(fileFns))
        .filter((x) => x.status === "fulfilled")
        // @ts-ignore
        .map((x) => x.value);

      const fileObj = files.reduce((a, file) => {
        a[file.key.replace(".json", "")] = file;
        return a;
      }, {});

      setCaptions((c) => ({ ...c, ...fileObj }));
    };
    
    fn();
  }, [urls, captions]);

  return (
    <CaptionContext.Provider
      value={{
        captions,
        urls,
        updateCaptionUrls,
      }}
    >
      {children}
    </CaptionContext.Provider>
  );
};

const useCaptions = () => {
  const context = React.useContext(CaptionContext);
  if (context === undefined) {
    throw new Error("useCaptions must be used within a CaptionProvider");
  }
  return context;
};

export { CaptionProvider, useCaptions };
