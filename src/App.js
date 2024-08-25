import React, { useState } from "react";
import classes from "./App.module.css";
import Form from "./components/Form";
import Output from "./components/Output";
import Exercise from "./components/Sequences/Exercise";
import Welcome from "./components/Sequences/Welcome";
import Break from "./components/Sequences/Break";
import Completion from "./components/Sequences/Completion";
import Counter from "./components/Counter";
import { useExerciseContext } from "./contexts/ExerciseContext";
import { useAppContext } from "./contexts/AppContext";

function App() {
  const { appMode, resetApp, counterValue } = useExerciseContext();
  const { enableSettings } = useAppContext();

  return (
    <div className={classes.container}>
      <h1>Chronocise</h1>
      {appMode === "default" && <Form />}
      {appMode !== "default" && <Output />}
      {appMode === "welcome" && <Welcome />}
      {appMode === "exercise" && <Exercise />}
      {appMode === "break" && <Break />}
      {appMode === "complete" && (
        <>
          <Completion />
          <div>
            <button
              onClick={() => {
                resetApp();
                enableSettings();
              }}
            >
              Start a New Workout
            </button>
          </div>
        </>
      )}
      {counterValue >= 0 && <Counter />}
    </div>
  );
}

export default App;
