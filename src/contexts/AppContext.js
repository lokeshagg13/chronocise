import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [voice, setVoice] = useState(0);

  function changeVoice(voiceObj) {
    setVoice(voiceObj);
  }

  return (
    <AppContext.Provider
      value={{
        voice,
        changeVoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
