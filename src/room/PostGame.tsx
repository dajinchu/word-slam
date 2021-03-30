import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { Button } from "../common/Button";
import { WordCard } from "../common/Cards";
import { db } from "../common/db";
import { DraggableWord } from "../common/types";
import { RoomClass } from "./useRoom";

const winnerEmote = "🧠";
const loserEmote = "😭";
export function PostGame({
  roomId,
  room,
}: {
  roomId: string;
  room: RoomClass;
}) {
  const [secret] = useObjectVal<string>(db.ref(`secrets/${roomId}`));
  const [redClues] = useObjectVal<DraggableWord[]>(
    db.ref(`clues/${roomId}/red`)
  );
  const [blueClues] = useObjectVal<DraggableWord[]>(
    db.ref(`clues/${roomId}/blue`)
  );
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col min-h-screen">
      <div className={`bg-${room.winner}team w-full p-5 text-white mb-5`}>
        {room.winner} team won!
        <div>
          the secret was <span className="text-2xl">{secret}</span>
        </div>
      </div>
      <div>
        <div className="text-xl">
          {room.winner === "red" ? winnerEmote : loserEmote} red team's clues
        </div>
        <div className="flex flex-row mt-2 h-28 z-10">
          {redClues &&
            redClues.map((clue) => (
              <div className="p-0.5 select-none">
                <WordCard word={clue.word} type={clue.type} />
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="text-xl">
          {room.winner === "red" ? winnerEmote : loserEmote} blue team's clues
        </div>
        <div className="flex flex-row mt-2 h-28 z-10">
          {blueClues &&
            blueClues.map((clue) => (
              <div className="p-0.5 select-none">
                <WordCard word={clue.word} type={clue.type} />
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          size="md"
          onClick={async () => {
            await db.ref(`rooms/${roomId}/status`).set("lobby");
            await db.ref(`clues/${roomId}`).remove();
            await db.ref(`secrets/${roomId}`).remove();
          }}
        >
          play again
        </Button>
      </div>
    </div>
  );
}
