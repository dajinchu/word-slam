import React, { useEffect, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { WordCard } from "../common/Cards";
import { DraggableWord, wordTypes } from "../common/types";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function Guesser() {
  const [clues, setClues] = useState<DraggableWord[]>([
    { id: "1", word: "hello", type: "adjective" },
    { id: "2", word: "fdjiaso", type: "verb" },
    { id: "3", word: "car", type: "noun" },
    { id: "5", word: "horse", type: "noun" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClues((clues) => shuffleArray([...clues]));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col min-h-screen">
      <Flipper flipKey={clues.map((w) => w.id).join("")}>
        {clues.map((clue) => (
          <Flipped key={clue.id} flipId={clue.id}>
            <div>
              <WordCard word={clue.word} type={clue.type} />
            </div>
          </Flipped>
        ))}
      </Flipper>
    </div>
  );
}
