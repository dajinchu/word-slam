import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { db } from "../common/db";
import { Room as RoomInfo } from "../common/types";
import { Lobby } from "./Lobby";

interface RoomProps extends RouteComponentProps {
  roomId: string;
}
export function Room({ roomId }: RoomProps) {
  const [room, loading, error] = useObjectVal<RoomInfo>(
    db.ref(`rooms/${roomId}`)
  );
  if (loading) {
    return null;
  } else if (room) {
    return <Lobby roomId={roomId} room={room} />;
  } else {
    return <div>Invalid room code</div>;
  }
}
