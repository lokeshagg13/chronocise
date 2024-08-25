import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { useAppContext } from "../../contexts/AppContext";
import { say, sayAsync } from "../../utils/textToSpeech";
import sleep from "../../utils/sleep";

async function breakSequence(
  breakTime,
  setOutput,
  startExercise,
  setCounterValue,
  voice
) {
  let counter = breakTime;
  let nextTimeAnnounce = 13;
  if (breakTime <= 10) {
    await say("Next Exercise start in", voice);
  }
  let breakInterval = setInterval(async () => {
    setOutput(`Next Exercise start in`);
    setCounterValue(counter);
    counter--;
    if (counter === nextTimeAnnounce) {
      sayAsync("Next Exercise start in", voice);
    }
    if (counter <= 10) {
      clearInterval(breakInterval);
      for (let counter = 10; counter > 0; counter--) {
        setOutput(`Next Exercise start in`);
        setCounterValue(counter);
        let timeSpent = await say(counter, voice);
        await sleep(1000 - timeSpent);
      }
      setOutput(`Go`);
      setCounterValue(-1);
      await say("Go", voice);
      startExercise();
    }
  }, 1000);
}

function Break() {
  const { currentBreak, breakTime, setOutput, startExercise, setCounterValue } =
    useExerciseContext();
  const { voice } = useAppContext();

  useEffect(() => {
    breakSequence(breakTime, setOutput, startExercise, setCounterValue, voice);
  }, [currentBreak]);

  return null;
}

export default Break;
