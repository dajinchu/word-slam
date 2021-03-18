import React from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { WordCard } from "../common/Cards";
import { useObjectVal } from "react-firebase-hooks/database";
import { DraggableWord } from "../common/types";
import { db } from "../common/db";

export function Guesser() {
  const [rawclues, loading, error] = useObjectVal<DraggableWord[]>(
    db.ref("clues/TEST/red")
  );
  const clues: DraggableWord[] = rawclues || [];

  return (
    <div className="max-w-screen-xl mx-auto">
      <Flipper
        flipKey={clues.map((w) => w.id).join("-")}
        className="flex flex-row h-28 z-10"
      >
        {clues.map((clue) => (
          <Flipped key={clue.id} flipId={clue.id}>
            <div className="p-0.5 select-none">
              <WordCard word={clue.word} type={clue.type} />
            </div>
          </Flipped>
        ))}
      </Flipper>
    </div>
  );
}
