import React from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { Button } from "../common/Button";
import { db } from "../common/db";
import { Rules } from "../common/Rules";
import { RoomPlayers, Team, otherTeam } from "../common/types";
import { pickBy } from "../common/utils";
import { NameModal } from "./NameModal";
import { Room as RoomInfo } from "../common/types";
import { Blob } from "./Blob";

// Get the cluemasters, defaulting to the first player if cluemaster is unset or incorrect
function getClueMaster(
  players: RoomPlayers,
  cluemaster: string | undefined,
  team: Team
): string | undefined {
  const setRed = !!cluemaster && !!players?.[cluemaster] && cluemaster;
  return (
    setRed || Object.entries(players).find(([k, p]) => p.team === team)?.[0]
  );
}

export function Lobby({ roomId, room }: { roomId: string; room: RoomInfo }) {
  const players = room.players || {};
  const currPlayer = players[db.userId];
  const blueClueMaster = getClueMaster(players, room.cluemasters?.blue, "blue");
  const redClueMaster = getClueMaster(players, room.cluemasters?.red, "red");

  return (
    <>
      <div
        className="mx-auto max-w-screen-lg p-6 
                   md:grid grid-rows-minfr gap-y-5 gap-x-5"
        style={{
          gridTemplateColumns: "max-content 1fr",
          gridTemplateRows: "min-content 1fr",
        }}
      >
        <div className="sticky top-6 z-10 rounded-lg p-5 shadow bg-primary text-white md:static">
          <div className="mb-1 text-sm">invite friends to</div>
          <a
            className="text-2xl font-bold"
            href={`https://slam.dajin.dev/${roomId}`}
          >
            slam.dajin.dev/{roomId}
          </a>
        </div>

        <Flipper
          flipKey={Object.values(players)
            .map((p) => p.nickname + p.team)
            .join("-")}
          className="sm:col-start-2 sm:row-span-2 py-6"
        >
          <TeamRoster
            currPlayer={db.userId}
            players={pickBy(players, ({ team }) => team === "red")}
            cluemaster={redClueMaster}
          />
          <TeamRoster
            currPlayer={db.userId}
            players={pickBy(players, ({ team }) => team === "blue")}
            cluemaster={blueClueMaster}
          />
        </Flipper>

        <div className="sticky inset-x-6 bottom-6 md:static md:w-full md:max-w-sm">
          <div className="rounded-md border bg-white mb-7">
            <div className="text-lg p-3 border-b">Quick rules</div>
            <div className="p-3">
              <Rules />
            </div>
          </div>
          {currPlayer && (
            <div className="grid grid-cols-2 grid-rows-2 h-32 auto-cols-max gap-y-4 gap-x-7">
              <Button
                size="fill"
                color="secondary"
                onClick={() => db.beCluemaster(roomId, currPlayer.team)}
              >
                be clue master
              </Button>
              <Button
                size="fill"
                color="secondary"
                onClick={() =>
                  db.switchTeam(roomId, otherTeam(currPlayer.team))
                }
              >
                join other team
              </Button>
              <div className="col-span-2 flex items-stretch">
                <Button size="fill">start game</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <NameModal
        visible={!currPlayer}
        onClose={async ({ name }) => {
          await db.joinRoom(roomId, name);
        }}
      />
    </>
  );
}

const TeamRoster = ({
  players,
  currPlayer,
  cluemaster,
}: {
  players: RoomPlayers;
  currPlayer: string;
  cluemaster?: string;
}) => (
  <div className="flex flex-wrap">
    {Object.entries(players).map(([id, { nickname, team }]) => (
      <Flipped key={nickname} flipId={nickname}>
        <div className={team === "red" ? "text-redteam" : "text-blueteam"}>
          <Blob
            text={nickname}
            cluemaster={id === cluemaster}
            isYou={id === currPlayer}
          />
        </div>
      </Flipped>
    ))}
  </div>
);
