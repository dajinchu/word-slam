import { RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import { db } from "../common/db";
import { Rules } from "../common/Rules";
import { Room as RoomInfo } from "../common/types";
import { NameModal } from "./NameModal";

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
    return <RoomImpl roomId={roomId} room={room} />;
  } else {
    return <div>Invalid room code</div>;
  }
}

function RoomImpl({ roomId, room }: { roomId: string; room: RoomInfo }) {
  const players = room.players || {};
  const isJoined = db.userId && Object.keys(players).includes(db.userId);
  return (
    <>
      <div className="mx-auto max-w-screen-lg p-2 sm:p-6">
        <div className="rounded-lg p-5 bg-primary text-white">
          <div className="mb-1 text-sm">invite friends to</div>
          <a
            className="text-2xl font-bold"
            href={`https://slam.dajin.dev/${roomId}`}
          >
            slam.dajin.dev/{roomId}
          </a>
        </div>
        {Object.values(players).map(({ nickname }) => (
          <div>{nickname}</div>
        ))}
        <Rules />
      </div>
      <NameModal
        visible={!isJoined}
        onClose={async ({ name }) => {
          await db.joinRoom(roomId, name);
        }}
      />
    </>
  );
}
