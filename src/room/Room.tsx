import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Lobby } from "./Lobby";
import { useRoom } from "./useRoom";

interface RoomProps extends RouteComponentProps {
  roomId: string;
}
export function Room({ roomId }: RoomProps) {
  const {loading, room} = useRoom(roomId)
  if (loading) {
    return null;
  } else if (room) {
    return <Lobby roomId={roomId} room={room} />;
  } else {
    return <div>Invalid room code</div>;
  }
}
