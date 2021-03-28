import { useObjectVal } from "react-firebase-hooks/database";
import { db } from "../common/db";
import { otherTeam, PlayerInfo, Room } from "../common/types";
import { useUser } from "../common/useUser";

export class RoomClass {
  public currPlayer?: PlayerInfo;
  constructor(
    public roomId: string,
    private userId: string,
    public room: Room
  ) {
    this.roomId = roomId;
    this.userId = userId;
    this.room = room;
    this.currPlayer = room.players?.[userId];
  }

  joinRoom = async (nickname: string) => {
    const team = "red";
    const playerinfo: PlayerInfo = { team, nickname };
    await db.ref(`rooms/${this.roomId}/players/${this.userId}`).set(playerinfo);

    const isCluemasterAlready = !!this.room.cluemasters?.[team];
    if (!isCluemasterAlready) {
      await this.beCluemaster();
    }
  };
  switchTeam = async () => {
    if (!this.currPlayer) {
      return;
    }
    const oldTeam = this.currPlayer.team;
    const newteam = otherTeam(oldTeam);
    await db
      .ref(`rooms/${this.roomId}/players/${this.userId}/team`)
      .set(newteam);

    const wasOldCluemaster = this.room.cluemasters?.[oldTeam] === this.userId;
    if (wasOldCluemaster) {
      // make someone else the cluemaster if someone is there
      const newCluemaster = Object.entries(this.room.players || {}).find(
        ([id, p]) => p.team === oldTeam && id != this.userId
      )?.[0];
      await db
        .ref(`rooms/${this.roomId}/cluemasters/${oldTeam}`)
        .set(newCluemaster);
    }
  };

  beCluemaster = async () => {
    if (!this.currPlayer) {
      return;
    }
    await db
      .ref(`rooms/${this.roomId}/cluemasters/${this.currPlayer.team}`)
      .set(this.userId);
  };
}

interface UseRoomReturn {
  loading: boolean;
  room?: RoomClass;
}

export function useRoom(roomId: string): UseRoomReturn {
  const [room, loading, error] = useObjectVal<Room>(db.ref(`rooms/${roomId}`));
  const [user, authloading, autherror] = useUser();

  if (!user || !room) {
    return { loading };
  }

  return {
    loading: loading && authloading,
    room: new RoomClass(roomId, user.uid, room),
  };
}
