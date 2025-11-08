"use client";
import { useState } from "react";

export default function VoiceInput({ onTranscript }: { onTranscript: (t: string) => void }) {
  const [listening, setListening] = useState(false);  
  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // you can dynamically change this
    recognition.start();

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      onTranscript(transcript);
    };
  };

  return (
    <button
      onClick={handleVoice}
      className={`p-2 rounded-full text-white ${listening ? "bg-red-500" : "bg-green-600"}`}
      title="Speak"
    >
      🎤
    </button>
  );
}
