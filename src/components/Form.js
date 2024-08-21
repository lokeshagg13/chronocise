import React, { useState } from "react";
import { useExerciseContext } from "../contexts/ExerciseContext";
import classes from "./Form.module.css";

function Form() {
  const { setExerciseData, startWorkout } = useExerciseContext();

  const [localExercises, setLocalExercises] = useState(0);
  const [localTime, setLocalTime] = useState(0);
  const [localBreaks, setLocalBreaks] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setExerciseData(
      parseInt(localExercises),
      parseInt(localTime),
      parseInt(localBreaks)
    );
    startWorkout();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label>
        Number of Exercises
        <input
          type="number"
          value={localExercises}
          onChange={(e) => setLocalExercises(e.target.value)}
          required
        />
      </label>
      <label>
        Time per Exercise (seconds)
        <input
          type="number"
          value={localTime}
          onChange={(e) => setLocalTime(e.target.value)}
          required
        />
      </label>
      <label>
        Break Time (seconds)
        <input
          type="number"
          value={localBreaks}
          onChange={(e) => setLocalBreaks(e.target.value)}
          required
        />
      </label>
      <button type="submit">Start Workout</button>
    </form>
  );
}

export default Form;
