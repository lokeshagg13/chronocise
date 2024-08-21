import { useExerciseContext } from "../contexts/ExerciseContext";
import classes from "./Counter.module.css";

function Counter() {
  const { counterValue } = useExerciseContext();
  return <div className={classes.counter}>{counterValue}</div>;
}

export default Counter;
