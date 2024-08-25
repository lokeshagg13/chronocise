export const say = async (message, voice) => {
  if (!window.speechSynthesis) {
    throw new Error("Speech Synthesis is not supported in this browser.");
  }

  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = voice.ref;
    const startTime = Date.now();
    utterance.onend = () => {
      resolve();
      return Date.now() - startTime;
    };

    utterance.onerror = (error) => {
      reject(error);
    };
    window.speechSynthesis.speak(utterance);
  });
};

export const sayAsync = (message, voice) => {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.voice = voice.ref;
  window.speechSynthesis.speak(utterance);
};
