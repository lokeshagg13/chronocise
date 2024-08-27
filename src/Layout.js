import React, { useState, useEffect } from "react";
import { sayAsync } from "./utils/textToSpeech";
import { useAppContext } from "./contexts/AppContext";
import classes from "./Layout.module.css";
import SettingsIcon from "./utils/settingsIcon";
import SettingsDisabledIcon from "./utils/settingsDisabledIcon";
const voices = window.speechSynthesis.getVoices();
    
function Layout({ children }) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [voiceList, setVoiceList] = useState([]);
  const { voice, settingsEnabled, changeVoice } = useAppContext();

  const toggleSettingsModal = () => {
    setShowSettingsModal((showSettingsModal) => !showSettingsModal);
  };

  useEffect(() => {
    let timer;
    if (showSettingsModal) {
      timer = setTimeout(() => {
        setShowSettingsModal(false);
      }, 20000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showSettingsModal]);

  useEffect(() => {
    const allVoices = [];
    voices.forEach((voice, index) => {
      let voiceName = `${voice.name} (${voice.lang})`;
      let voiceID = index;
      allVoices.push({
        id: voiceID,
        name: voiceName,
        ref: voices[voiceID],
      });
    });
    if (allVoices.length === 0) {
      const voiceName = window.speechSynthesis.getVoices()[1]
        ? `${window.speechSynthesis.getVoices()[1].name} (${
            window.speechSynthesis.getVoices()[1].lang
          })`
        : "";
      const autoVoice = {
        id: 0,
        name: voiceName,
        ref: window.speechSynthesis.getVoices()[1],
      };
      changeVoice(autoVoice);
    } else {
      changeVoice(allVoices[1]);
      console.log(allVoices);
      setVoiceList(allVoices);
    }
    // eslint-disable-next-line
  }, []);

  function voiceChangeHandler(event) {
    changeVoice(voiceList[event.target.value]);
    sayAsync("Hello", voiceList[event.target.value]);
  }

  return (
    <div className={classes.layout}>
      <div className={classes["background-video-container"]}>
        <video
          id="bg-video"
          src="media/bg.mp4"
          autoPlay
          loop
          muted
          className={classes["background-video"]}
        />
      </div>

      <div className={classes["settings-container"]}>
        <button
          className={classes["settings-icon"]}
          onClick={toggleSettingsModal}
          disabled={!settingsEnabled}
        >
          {settingsEnabled ? <SettingsIcon /> : <SettingsDisabledIcon />}
        </button>
        {showSettingsModal && (
          <div className={classes["settings-modal"]}>
            <select
              className={classes["voice-dropdown"]}
              onChange={voiceChangeHandler}
              value={voice.id}
            >
              {voiceList.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className={classes["content-container"]}>{children}</div>
    </div>
  );
}

export default Layout;
