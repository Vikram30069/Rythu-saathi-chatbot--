"use client";

export default function SuggestionList({
  suggestions,
  onSelect,
}: {
  suggestions: string[];
  onSelect: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          className="px-3 py-2 bg-gray-100 hover:bg-green-100 border rounded-full text-sm text-gray-700 transition"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
