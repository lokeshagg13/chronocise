import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { say } from "../../utils/textToSpeech";
import sleep from "../../utils/sleep";

async function welcomeSequence(setOutput, startExercise) {
  setOutput("WELCOME");
  await say("Welcome to Chronocise !!!");
  let counter = 5;
  setOutput(`Beginning workout in ...`);
  await say(`Beginning workout in`);
  for (; counter > 0; counter--) {
    setOutput(`Beginning exercise in ${counter} ...`);
    console.log(counter);
    const timeSpent = await say(counter);
    await sleep(1000 - timeSpent);
  }
  setOutput(`Let's Go !!`);
  await say("Let's go");
  startExercise();
}

function Welcome() {
  const { setOutput, startExercise } = useExerciseContext();
  useEffect(() => {
    welcomeSequence(setOutput, startExercise);
  }, []);

  return null;
}

export default Welcome;
