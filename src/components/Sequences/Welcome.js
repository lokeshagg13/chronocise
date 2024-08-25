import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { useAppContext } from "../../contexts/AppContext";
import { say } from "../../utils/textToSpeech";
import sleep from "../../utils/sleep";

async function welcomeSequence(
  setOutput,
  startExercise,
  setCounterValue,
  voice
) {
  setOutput("WELCOME");
  await say("Welcome to Chronocise", voice);
  let counter = 5;
  setOutput(`Beginning workout in`);
  await say(`Beginning workout in`, voice);
  for (; counter > 0; counter--) {
    setCounterValue(counter);
    const timeSpent = await say(counter, voice);
    await sleep(1000 - timeSpent);
  }
  setCounterValue(-1);
  setOutput(`Let's Go`);
  await say("Let's go", voice);
  startExercise();
}

function Welcome() {
  const { setOutput, startExercise, setCounterValue } = useExerciseContext();
  const { voice } = useAppContext();

  useEffect(() => {
    welcomeSequence(setOutput, startExercise, setCounterValue, voice);
  }, []);

  return null;
}

export default Welcome;
