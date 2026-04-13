"use client";

import { useState } from "react";

const flashcards = [
  { word: "Ephemeral", definition: "Lasting for a very short time", example: "The beauty of a sunset is ephemeral." },
  { word: "Resilient", definition: "Able to recover quickly from difficulties", example: "She was resilient in the face of failure." },
  { word: "Ambiguous", definition: "Open to more than one interpretation", example: "His answer was ambiguous and confusing." },
  { word: "Eloquent", definition: "Fluent and persuasive in speaking or writing", example: "The president gave an eloquent speech." },
  { word: "Tenacious", definition: "Holding firm to a purpose; persistent", example: "The tenacious athlete never gave up." },
  { word: "Meticulous", definition: "Showing great attention to detail", example: "She was meticulous in her research." },
  { word: "Obsolete", definition: "No longer produced or used; out of date", example: "Floppy disks are now obsolete." },
  { word: "Pragmatic", definition: "Dealing with things sensibly and realistically", example: "He took a pragmatic approach to the problem." },
  { word: "Verbose", definition: "Using more words than needed", example: "His verbose explanation confused everyone." },
  { word: "Serendipity", definition: "Finding something good without looking for it", example: "Meeting her was pure serendipity." },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [unknown, setUnknown] = useState<number[]>([]);

  const card = flashcards[index];
  const progress = Math.round(((known.length + unknown.length) / flashcards.length) * 100);

  function next(result: "known" | "unknown") {
    if (result === "known") setKnown((p) => [...p, index]);
    else setUnknown((p) => [...p, index]);
    setFlipped(false);
    setTimeout(() => setIndex((i) => i + 1), 150);
  }

  function restart() {
    setIndex(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
  }

  const done = index >= flashcards.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">English Flashcards</h1>
      <p className="text-slate-400 mb-8 text-sm">Click the card to reveal the definition</p>

      {!done ? (
        <>
          {/* Progress bar */}
          <div className="w-full max-w-md mb-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{index} / {flashcards.length} cards</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div
            className="w-full max-w-md cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setFlipped((f) => !f)}
          >
            <div
              className="relative w-full h-64 transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-4">Word</span>
                <span className="text-4xl font-bold text-slate-800">{card.word}</span>
                <span className="text-slate-400 text-sm mt-4">tap to flip</span>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-xs uppercase tracking-widest text-indigo-200 font-semibold mb-4">Definition</span>
                <p className="text-white text-xl font-semibold mb-4">{card.definition}</p>
                <p className="text-indigo-200 text-sm italic">&quot;{card.example}&quot;</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => next("unknown")}
              className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-semibold transition-colors shadow-lg"
            >
              Still learning
            </button>
            <button
              onClick={() => next("known")}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors shadow-lg"
            >
              Got it!
            </button>
          </div>
        </>
      ) : (
        /* Results */
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Session complete!</h2>
          <p className="text-slate-500 mb-6">Here&apos;s how you did</p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">{known.length}</div>
              <div className="text-sm text-slate-500">Known</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-500">{unknown.length}</div>
              <div className="text-sm text-slate-500">To review</div>
            </div>
          </div>
          <button
            onClick={restart}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            Restart
          </button>
        </div>
      )}
    </main>
  );
}
