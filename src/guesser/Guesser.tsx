import React from "react";
import { RoomClass } from "../room/useRoom";
import { GuesserWaiting } from "./GuesserWaiting";
import { GuesserGame } from "./GuesserGame";

export function Guesser({ roomId, room }: { roomId: string; room: RoomClass }) {
  switch(room.status) {
    case "picking": return <GuesserWaiting/>
    case "game": return <GuesserGame roomId={roomId} room={room}/>
    default: return null;
  }
}
