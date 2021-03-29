import React from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { Button } from "../common/Button";
import { Rules } from "../common/Rules";
import { PlayerInfo } from "../common/types";
import { NameModal } from "./NameModal";
import { Blob } from "./Blob";
import { useUser } from "../common/useUser";
import { RoomClass } from "./useRoom";
import { RulesCard } from "../common/RulesCard";

export function Lobby({ roomId, room }: { roomId: string; room: RoomClass }) {
  const [user] = useUser();
  const players = room.players || {};
  // const blueClueMaster = getClueMaster(players, room.cluemasters?.blue, "blue");
  // const redClueMaster = getClueMaster(players, room.cluemasters?.red, "red");
  if (!user) {
    return null;
  }

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
            currPlayer={user.uid}
            players={players.filter(({ team }) => team === "red")}
            cluemaster={room.cluemasters?.red}
          />
          <TeamRoster
            currPlayer={user.uid}
            players={players.filter(({ team }) => team === "blue")}
            cluemaster={room.cluemasters?.blue}
          />
        </Flipper>

        <div className="sticky inset-x-6 bottom-6 md:static md:w-full md:max-w-sm">
          <RulesCard />
          {room.currPlayer && (
            <div className="grid grid-cols-2 grid-rows-2 h-32 auto-cols-max gap-y-4 gap-x-7">
              <Button size="fill" color="secondary" onClick={room.beCluemaster}>
                be clue master
              </Button>
              <Button size="fill" color="secondary" onClick={room.switchTeam}>
                join other team
              </Button>
              <div className="col-span-2 flex items-stretch">
                <Button size="fill" onClick={room.startGame}>
                  start game
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <NameModal
        visible={!room.currPlayer}
        onClose={async ({ name }) => {
          await room.joinRoom(name);
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
  players: PlayerInfo[];
  currPlayer: string;
  cluemaster?: string;
}) => (
  <div className="flex flex-wrap">
    {players.map(({ id, nickname, team }) => (
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
