import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [settingsEnabled, setSettingsEnabled] = useState(true);
  const [voice, setVoice] = useState(0);

  function disableSettings() {
    setSettingsEnabled(false);
  }

  function enableSettings() {
    setSettingsEnabled(true);
  }

  function changeVoice(voiceObj) {
    setVoice(voiceObj);
  }

  return (
    <AppContext.Provider
      value={{
        voice,
        settingsEnabled,
        changeVoice,
        enableSettings,
        disableSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
