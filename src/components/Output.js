import React from "react";

import { useExerciseContext } from "../contexts/ExerciseContext";
import classes from "./Output.module.css";

function Output() {
  const { output } = useExerciseContext();
  return <div className={classes.output}>{output}</div>;
}

export default Output;
