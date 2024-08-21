import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { say } from "../../utils/textToSpeech";
import sleep from "../../utils/sleep";

async function welcomeSequence(setOutput, startExercise, setCounterValue) {
  setOutput("WELCOME");
  await say("Welcome to Chronocise");
  let counter = 5;
  setOutput(`Beginning workout in`);
  await say(`Beginning workout in`);
  for (; counter > 0; counter--) {
    setCounterValue(counter);
    const timeSpent = await say(counter);
    await sleep(1000 - timeSpent);
  }
  setCounterValue(-1);
  setOutput(`Let's Go`);
  await say("Let's go");
  startExercise();
}

function Welcome() {
  const { setOutput, startExercise, setCounterValue } = useExerciseContext();
  useEffect(() => {
    welcomeSequence(setOutput, startExercise, setCounterValue);
  }, []);

  return null;
}

export default Welcome;
