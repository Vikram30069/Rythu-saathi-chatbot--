"use client";

export default function useTextToSpeech() {
  const speak = (text: string, lang = "te-IN") => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };
  return speak;
}
