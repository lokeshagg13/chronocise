import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { say } from "../../utils/textToSpeech";

async function completionSequence(setOutput) {
  setOutput("Great Job !! Your workout is complete.");
  await say("Great Job !!");
  await say("Your workout is complete.");
}

function Completion() {
  const { setOutput } = useExerciseContext();

  useEffect(() => {
    completionSequence(setOutput);
  }, []);

  return null;
}

export default Completion;
