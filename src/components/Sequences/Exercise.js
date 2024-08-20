import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { say, sayAsync } from "../../utils/textToSpeech";
import sleep from "../../utils/sleep";

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

  let counter = timePerExercise + 1;
  let waitTimeTillNextMotivation = Math.floor(Math.random() * (16 - 10)) + 10;
  let exerciseInterval = setInterval(async () => {
    counter--;
    setOutput(`Exercise time: ${counter} seconds ...`);
    if (
      counter > 10 &&
      counter < timePerExercise - waitTimeTillNextMotivation
    ) {
      sayAsync(getRandomMotivationalPhrase());
      waitTimeTillNextMotivation =
        waitTimeTillNextMotivation +
        (Math.floor(Math.random() * (16 - 10)) + 10);
    }
    if (counter <= 10) {
      setOutput(`Exercise time: ${counter + 1} seconds ...`);
      clearInterval(exerciseInterval);
      for (let counter = 10; counter > 0; counter--) {
        setOutput(`Exercise time: ${counter} seconds ...`);
        let timeSpent = await say(counter);
        await sleep(1000 - timeSpent);
      }
      if (!isLastExercise()) {
        setOutput(`Break Time`);
        await say(getRandomMotivationalPhrase());
        await say("It's break time");
      }
      startBreak();
    }
  }, 1000);
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
