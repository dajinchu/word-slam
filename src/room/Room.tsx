import { RouteComponentProps } from "@reach/router";
import React from "react";
import { ClueMaster } from "../cluemaster/ClueMaster";
import { WordSelection } from "../cluemaster/WordSelection";
import { Guesser } from "../guesser/Guesser";
import { GuesserWaiting } from "../guesser/GuesserWaiting";
import { Lobby } from "./Lobby";
import { useRoom } from "./useRoom";

interface RoomProps extends RouteComponentProps {
  roomId: string;
}
export function Room({ roomId }: RoomProps) {
  const { loading, room } = useRoom(roomId);
  const status = room?.status;
  if (loading) {
    return null;
  } else if (room) {
    const isCluemaster = Object.values(room.cluemasters || {}).includes(
      room.currPlayer?.id
    );
    switch (status) {
      case "lobby":
        return <Lobby roomId={roomId} room={room} />;
      case "game":
        return isCluemaster ? (
          <ClueMaster roomId={roomId} />
        ) : (
          <Guesser roomId={roomId} />
        );
      case "picking":
        return isCluemaster ? (
          <WordSelection roomId={roomId} cluemasters={room.cluemasters} />
        ) : (
          <GuesserWaiting />
        );
      default:
        return null;
    }
  } else {
    return <div>Invalid room code</div>;
  }
}
