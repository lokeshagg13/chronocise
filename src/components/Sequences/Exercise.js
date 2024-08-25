import { useEffect } from "react";
import { useExerciseContext } from "../../contexts/ExerciseContext";
import { useAppContext } from "../../contexts/AppContext";
import { say, sayAsync } from "../../utils/textToSpeech";
import sleep from "../../utils/sleep";

async function exerciseSequence(
  timePerExercise,
  setOutput,
  startBreak,
  isLastExercise,
  setCounterValue,
  voice
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

  setOutput("Exercise time");
  let counter = timePerExercise + 1;
  let waitTimeTillNextMotivation = Math.floor(Math.random() * (16 - 10)) + 10;
  let exerciseInterval = setInterval(async () => {
    counter--;
    setCounterValue(counter);
    if (
      counter > 10 &&
      counter < timePerExercise - waitTimeTillNextMotivation
    ) {
      sayAsync(getRandomMotivationalPhrase(), voice);
      waitTimeTillNextMotivation =
        waitTimeTillNextMotivation +
        (Math.floor(Math.random() * (16 - 10)) + 10);
    }
    if (counter <= 10) {
      setCounterValue(counter + 1);
      clearInterval(exerciseInterval);
      for (let counter = 10; counter > 0; counter--) {
        setCounterValue(counter);
        let timeSpent = await say(counter, voice);
        await sleep(1000 - timeSpent);
      }
      if (!isLastExercise()) {
        setOutput(`Break Time`);
        setCounterValue(-1);
        await say(getRandomMotivationalPhrase(), voice);
        await say("It's break time", voice);
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
    setCounterValue,
  } = useExerciseContext();

  const { voice } = useAppContext();

  useEffect(() => {
    exerciseSequence(
      timePerExercise,
      setOutput,
      startBreak,
      isLastExercise,
      setCounterValue,
      voice
    );
  }, [currentExercise]);
  return null;
}

export default Exercise;
