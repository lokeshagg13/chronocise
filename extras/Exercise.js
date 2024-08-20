import { useEffect } from "react";
import { useExerciseContext } from "../contexts/ExerciseContext";
import { say, sayAsync } from "../utils/textToSpeech";
import sleep from "../utils/sleep";

async function exerciseSequence(
  timePerExercise,
  setOutput,
  startBreak,
  isLastExercise
) {
  const motivationalPhrases = [
    "Well done!",
    "Keep it up!",
    "You're strong!",
    "You're doing great!",
    "Almost there!",
    "Stay focused!",
    "Keep pushing!",
    "You're a champ!",
    "Fantastic work!",
    "Push through it!",
    "You're unstoppable!",
    "Don't give up!",
  ];
  const coveredPhrases = [];

  function getRandomMotivationalPhrase() {
    if (coveredPhrases.length === motivationalPhrases.length) {
      coveredPhrases = [];
    }
    let motivationalPhraseIndex = Math.floor(
      Math.random() * motivationalPhrases.length
    );
    while (coveredPhrases.includes(motivationalPhraseIndex)) {
      motivationalPhraseIndex = Math.floor(
        Math.random() * motivationalPhrases.length
      );
      if (coveredPhrases.length === motivationalPhrases.length) {
        coveredPhrases = [];
      }
    }
    coveredPhrases.push(motivationalPhraseIndex);
    return motivationalPhrases[motivationalPhraseIndex];
  }

  let waitTimeTillNextMotivation = Math.floor(Math.random() * (16 - 10)) + 10;
  for (let counter = timePerExercise; counter > 0; counter--) {
    console.log(counter);
    setOutput(`Exercise time: ${counter} seconds ...`);
    if (counter <= 10) {
      await say(counter);
    } else if (
      counter > 10 &&
      counter < timePerExercise - waitTimeTillNextMotivation
    ) {
      sayAsync(getRandomMotivationalPhrase());
      waitTimeTillNextMotivation =
        waitTimeTillNextMotivation +
        (Math.floor(Math.random() * (16 - 10)) + 10);
    }
    await sleep(500);
  }
  if (!isLastExercise()) {
    setOutput(`Exercise Completed`);
    await say(getRandomMotivationalPhrase());
  }
  startBreak();
}

function Exercise() {
  const {
    currentExercise,
    timePerExercise,
    setOutput,
    isLastExercise,
    startBreak,
  } = useExerciseContext();

  useEffect(() => {
    exerciseSequence(timePerExercise, setOutput, startBreak, isLastExercise);
  }, [currentExercise]);

  return null;
}

export default Exercise;
