import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { useAppContext } from "../../contexts/AppContext";
import { say } from "../../utils/textToSpeech";

async function completionSequence(setOutput, voice) {
  setOutput("Workout completed");
  await say("Great Job !!", voice);
  await say("Your workout is complete.", voice);
}

function Completion() {
  const { setOutput, setCounterValue } = useExerciseContext();
  const { voice } = useAppContext();

  useEffect(() => {
    setCounterValue(-1);
    completionSequence(setOutput, voice);
  }, []);

  return null;
}

export default Completion;
