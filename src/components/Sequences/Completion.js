import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { say } from "../../utils/textToSpeech";

async function completionSequence(setOutput) {
  setOutput("Workout completed");
  await say("Great Job !!");
  await say("Your workout is complete.");
}

function Completion() {
  const { setOutput, setCounterValue } = useExerciseContext();

  useEffect(() => {
    setCounterValue(-1)
    completionSequence(setOutput);
  }, []);

  return null;
}

export default Completion;
