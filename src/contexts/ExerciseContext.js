import React, { createContext, useState, useContext } from "react";

const ExerciseContext = createContext();

export function ExerciseProvider({ children }) {
  const [appMode, setAppMode] = useState("default");
  const [numExercises, setNumExercises] = useState(0);
  const [timePerExercise, setTimePerExercise] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [output, setOutput] = useState("");
  const [counterValue, setCounterValue] = useState(-1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentBreak, setCurrentBreak] = useState(1);

  function resetApp() {
    setAppMode("default");
    setNumExercises(0);
    setTimePerExercise(0);
    setBreakTime(0);
    setOutput("");
    setCurrentExercise(0);
    setCurrentBreak(1);
  }

  function setExerciseData(ne, tpe, bt) {
    setNumExercises(ne);
    setTimePerExercise(tpe);
    setBreakTime(bt);
  }

  function startWorkout() {
    console.log("welcome func");
    setAppMode("welcome");
  }

  function startExercise() {
    console.log("start exercise func");
    if (currentExercise >= numExercises) {
      return;
    }
    setCurrentExercise(currentExercise + 1);
    setAppMode("exercise");
  }

  function isLastExercise() {
    return currentExercise === numExercises;
  }

  function startBreak() {
    console.log("start break func");
    if (currentBreak >= numExercises) {
      setAppMode("complete");
      return;
    }
    setCurrentBreak(currentBreak + 1);
    setAppMode("break");
  }

  return (
    <ExerciseContext.Provider
      value={{
        appMode,
        timePerExercise,
        breakTime,
        currentExercise,
        output,
        counterValue,
        setOutput,
        setExerciseData,
        setCounterValue,
        startWorkout,
        isLastExercise,
        startExercise,
        startBreak,
        resetApp,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExerciseContext() {
  return useContext(ExerciseContext);
}
