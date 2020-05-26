import React, { useState, useEffect } from "react";

interface ICaption {
  text?: string;
  subject?: string;
  from?: string;
}

interface ICaptionProvider {
  captions: {
    [key: string]: ICaption;
  };
}

const CaptionContext = React.createContext<ICaptionProvider | void>(undefined);

const CaptionProvider: React.FC = ({ children }) => {
  const [captions, setCaptions] = useState({});

  return (
    <CaptionContext.Provider
      value={{
        captions,
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
