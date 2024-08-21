import React, { useState, useEffect, useRef } from "react";
import classes from "./Layout.module.css";

function Layout({ children }) {
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

      <div className={classes["content-container"]}>{children}</div>
    </div>
  );
}

export default Layout;
