"use client";
import SuggestionList from "@/components/SuggestionList";
import VoiceInput from "@/components/VoiceInput";
import { useState } from "react";
import { Send, Mic, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import useTextToSpeech from "@/components/useTextToSpeech";

export default function ChatInterface({ userId }: { userId: string }) {
  const router = useRouter();
  const speak = useTextToSpeech();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("te");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, language, userId }),
      });

      const data = await res.json();

      if (data.success) {
        const botReply = data.data.message;

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: botReply },
        ]);

        const langMap: Record<string, string> = {
          te: "te-IN",
          hi: "hi-IN",
          en: "en-US",
        };

        speak(botReply, langMap[language] || "en-US");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center gap-3">
        <button onClick={() => router.push("/")}>
          <ArrowLeft size={32} />
        </button>
        <h1 className="text-3xl font-bold">Rythu Saathi</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="ml-auto bg-green-700 px-6 py-2 rounded text-2xl"
        >
          <option value="te">తెలుగు</option>
          <option value="hi">हिन्दी</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 mr-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex justify-center ml-5">
              <div
                className={`max-w-xl px-10 py-8 rounded-2xl text-3xl ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center">
            <div className="max-w-xl px-10 py-8 rounded-2xl text-3xl bg-gray-100 border text-gray-800">
              ⏳ Generating response...
            </div>
          </div>
        )}
      </div>

      {/* Suggestions Bar */}
      <div className="px-4 mb-6 flex gap-4 flex-wrap">
        {/* Directly style here if SuggestionList doesn't pass props */}
        {[
          "Today's crop prices",
          "Weather forecast",
          "Fertilizer recommendation",
          "Soil testing info",
          "Best crop for my soil",
        ].map((s, i) => (
          <button
            key={i}
            className="px-8 py-4 text-2xl font-semibold rounded-full border m-2 bg-white hover:bg-green-100 transition-colors"
            onClick={() => {
              setInput(s);
              sendMessage();
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-8 border-t flex gap-4 items-center">
        <VoiceInput
          onTranscript={(text) => {
            setInput(text);
            // sendMessage(); // Uncomment to auto-send after speaking
          }}
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type message..."
          className="flex-1 px-8 py-5 border-2 rounded-xl text-2xl"
        />
        <button
          onClick={sendMessage}
          className="p-5 bg-green-600 text-white rounded-xl"
        >
          <Send size={32} />
        </button>
      </div>
    </div>
  );
}
