import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { Flipper, Flipped } from "react-flip-toolkit";
import { WordCard } from "../common/Cards";
import { db } from "../common/db";
import { DraggableWord } from "../common/types";
import { useUser } from "../common/useUser";
import { RoomClass } from "../room/useRoom";
import { Blob } from "../room/Blob";

export function GuesserGame({
  roomId,
  room,
}: {
  roomId: string;
  room: RoomClass;
}) {
  const currTeam = room.currPlayer?.team;
  const teammates = room.players.filter((p) => p.team === currTeam);
  const team = teammates[0].team;
  const [rawclues, loading, error] = useObjectVal<DraggableWord[]>(
    db.ref(`clues/${roomId}/${team}`)
  );
  const [user] = useUser();
  const clues: DraggableWord[] = rawclues || [];

  if (!currTeam) {
    return null;
  }
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center">
      {clues ? (
        <>
        <Flipper
          flipKey={clues.map((w) => w.id).join("-")}
          className="flex flex-row mt-10 h-28 z-10"
        >
          {clues.map((clue) => (
            <Flipped key={clue.id} flipId={clue.id}>
              <div className="p-0.5 select-none">
                <WordCard word={clue.word} type={clue.type} />
              </div>
            </Flipped>
          ))}
        </Flipper>
        <div>Guess the secret using the hints! Shout them out! Guess wildly!</div>
        </>
      ) : (
        <div>Waiting for you team's cluemaster to put clues here!</div>
      )}
      <div
        className={`mt-20 w-96 flex flex-row flex-wrap justify-center ${
          team === "red" ? "text-redteam" : "text-blueteam"
        }`}
      >
        {teammates.map(({ nickname, id }) => (
          <Blob
            text={nickname}
            isYou={id === user?.uid}
            cluemaster={id === room.cluemasters[currTeam]}
          />
        ))}
      </div>
    </div>
  );
}
