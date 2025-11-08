"use client";

import VoiceInput from "@/components/VoiceInput";
import { useState } from "react";
import { Send, Mic, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import useTextToSpeech from "@/components/useTextToSpeech";

export default function ChatInterface({ userId }: { userId: string }) {
  const router = useRouter();
  const speak = useTextToSpeech(); // 🗣️ Initialize Text-to-Speech

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

        // Add AI message
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: botReply },
        ]);

        // 🗣️ Speak out the bot's reply in the selected language
        const langMap: Record<string, string> = {
          te: "te-IN", // Telugu
          hi: "hi-IN", // Hindi
          en: "en-US", // English
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
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Rythu Saathi</h1>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="ml-auto bg-green-700 px-3 py-1 rounded"
        >
          <option value="te">తెలుగు</option>
          <option value="hi">हिन्दी</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div>⏳ Generating response...</div>}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 items-center">
  <VoiceInput
    onTranscript={(text) => {
      setInput(text);
      // Auto-send after speaking if you want:
      // sendMessage();
    }}
  />

  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
    placeholder="Type message..."
    className="flex-1 px-4 py-3 border-2 rounded-xl"
  />

  <button
    onClick={sendMessage}
    className="p-3 bg-green-600 text-white rounded-xl"
  >
    <Send size={20} />
  </button>
</div>
    </div>
  );
}
