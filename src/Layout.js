import React, { useState, useEffect, useRef } from "react";
import classes from "./Layout.module.css";

function Layout({ children }) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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
        <button className={classes["settings-icon"]} onClick={toggleSettingsModal}>
          &#9881;
        </button>
        {showSettingsModal && (
          <div className={classes["settings-modal"]}>
            <select className={classes["voice-dropdown"]}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        )}
      </div>

      <div className={classes["content-container"]}>{children}</div>
    </div>
  );
}

export default Layout;
