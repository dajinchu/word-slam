import React from "react";
import { RoomClass } from "../room/useRoom";
import { ClueMasterGame } from "./ClueMasterGame";
import { WordSelection } from "./WordSelection";

export function ClueMaster({
  roomId,
  room,
}: {
  roomId: string;
  room: RoomClass;
}) {
  if (!room.currPlayer) {
    return null;
  }
  switch (room.status) {
    case "picking":
      return <WordSelection roomId={roomId} cluemasters={room.cluemasters} />;
    case "game":
      return <ClueMasterGame roomId={roomId} team={room.currPlayer.team} />;
    default:
      return null;
  }
}
