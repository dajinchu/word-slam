import { RouteComponentProps } from "@reach/router";
import React from "react";
import { ClueMaster } from "../cluemaster/ClueMaster";
import { Guesser } from "../guesser/Guesser";
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
    switch (status) {
      case "lobby":
        return <Lobby roomId={roomId} room={room} />;
      case "game":
        const isCluemaster = Object.values(
          room.cluemasters || {}
        ).includes(room.currPlayer?.id);
        return isCluemaster ? (
          <ClueMaster roomId={roomId} />
        ) : (
          <Guesser roomId={roomId} />
        );
      default:
        return null;
    }
  } else {
    return <div>Invalid room code</div>;
  }
}
