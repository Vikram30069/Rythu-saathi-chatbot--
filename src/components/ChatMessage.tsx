export default function ChatMessage({ responseText }: { responseText: string }) {
  const speak = useTextToSpeech();

  return (
    <div className="max-w-xs px-4 py-3 rounded-2xl bg-white border flex flex-col gap-2">
      <p>{responseText}</p>
      <button
        onClick={() => speak(responseText, "te-IN")}
        className="text-sm text-green-700 font-semibold self-end"
      >
        🔊 Listen
      </button>
    </div>
  );
}
