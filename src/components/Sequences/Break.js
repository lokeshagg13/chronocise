import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { say, sayAsync } from "../../utils/textToSpeech";
import sleep from "../../utils/sleep";

async function breakSequence(
  breakTime,
  setOutput,
  startExercise,
  setCounterValue
) {
  let counter = breakTime;
  let nextTimeAnnounce = 13;
  if (breakTime <= 10) {
    await say("Next Exercise start in");
  }
  let breakInterval = setInterval(async () => {
    setOutput(`Next Exercise start in`);
    setCounterValue(counter);
    counter--;
    if (counter === nextTimeAnnounce) {
      sayAsync("Next Exercise start in");
    }
    if (counter <= 10) {
      clearInterval(breakInterval);
      for (let counter = 10; counter > 0; counter--) {
        setOutput(`Next Exercise start in`);
        setCounterValue(counter);
        let timeSpent = await say(counter);
        await sleep(1000 - timeSpent);
      }
      setOutput(`Go`);
      setCounterValue(-1);
      await say("Go");
      startExercise();
    }
  }, 1000);
}

function Break() {
  const { currentBreak, breakTime, setOutput, startExercise, setCounterValue } =
    useExerciseContext();

  useEffect(() => {
    breakSequence(breakTime, setOutput, startExercise, setCounterValue);
  }, [currentBreak]);

  return null;
}

export default Break;
