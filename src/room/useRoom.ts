import { useMemo } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { db } from "../common/db";
import {
  otherTeam,
  PlayerInfo,
  Room,
  RoomCluemasters,
  RoomStatus,
  Team,
  teams,
} from "../common/types";
import { useBeforeunload } from "../common/useBeforeunload";
import { useUser } from "../common/useUser";

export class RoomClass {
  public currPlayer?: PlayerInfo;
  public players;
  public cluemasters: RoomCluemasters;
  public status: RoomStatus;
  constructor(
    public roomId: string,
    private userId: string,
    private room: Room
  ) {
    this.roomId = roomId;
    this.userId = userId;
    this.room = room;
    this.currPlayer = room.players.find((p) => p.id === userId);
    this.players = this.room.players;
    this.cluemasters = {
      blue: this.getCluemaster("blue"),
      red: this.getCluemaster("red"),
    };
    this.status = room.status;
  }

  private ref(path: string) {
    return db.ref(`rooms/${this.roomId}`).child(path);
  }

  private getCluemaster(team: Team): string | undefined {
    const teamIds = this.players
      .filter((p) => p.team === team)
      .map((p) => p.id);
    let cm = this.room.cluemasters?.[team];
    if (!teamIds.find((id) => id === cm)) {
      // if no cluemaster, set it to first player and update db if it is current user
      cm = teamIds?.[0];
      if (cm === this.userId) {
        this.beCluemaster();
      }
    }
    return cm;
  }

  joinRoom = async (nickname: string) => {
    const redteam = this.room.players.filter(({ team }) => team === "red");
    const team: Team =
      this.room.players.length > redteam.length * 2 ? "red" : "blue";
    this.currPlayer = { id: this.userId, team, nickname };
    await this.ref(`/players/${this.userId}`).set(this.currPlayer);
    this.room.players.push(this.currPlayer);

    // const isCluemasterAlready = !!this.room.cluemasters?.[team];
    // if (!isCluemasterAlready) {
    //   await this.ref(`/cluemasters/${team}`).set(this.userId);
    // }
    await this.fixCluemaster();
  };

  leaveRoom = async () => {
    if (!this.currPlayer) {
      return;
    }
    const idx = this.room.players.findIndex(
      (p) => p.id === this.currPlayer?.id
    );
    this.room.players.splice(idx, 1);
    await Promise.all([
      this.ref(`/players/${this.userId}`).remove(),
      this.fixCluemaster(),
    ]);
  };

  switchTeam = async () => {
    if (!this.currPlayer) {
      return;
    }
    const oldTeam = this.currPlayer.team;
    const newteam = otherTeam(oldTeam);
    await this.ref(`/players/${this.userId}/team`).set(newteam);
    this.currPlayer.team = newteam;
    await this.fixCluemaster();
  };

  private async fixCluemaster() {
    await Promise.all(
      teams.map(async (team) => {
        console.log("fixing", team);
        const existsClumeaster = this.room.players.find(
          (p) => p.team === team && p.id === this.room.cluemasters?.[team]
        );
        console.log("pllayers", this.room.players);
        if (!existsClumeaster) {
          // make someone else the cluemaster if someone is there
          const newCluemaster = this.room.players.find((p) => p.team === team);
          console.log(`making ${newCluemaster?.id} CM for ${team}`);
          if (newCluemaster) {
            await this.ref(`/cluemasters/${team}`).set(newCluemaster.id);
          }
        }
      })
    );
  }

  beCluemaster = async () => {
    if (
      !this.currPlayer ||
      this.room.cluemasters?.[this.currPlayer.team] === this.userId
    ) {
      return;
    }
    await this.ref(`/cluemasters/${this.currPlayer.team}`).set(this.userId);
  };

  startGame = async () => {
    await this.ref("/status").set("picking");
  };
}

interface UseRoomReturn {
  loading: boolean;
  room?: RoomClass;
}

function transformRoom(room: any): Room {
  const players: PlayerInfo[] = Object.entries(
    (room.players as Record<string, PlayerInfo>) || {}
  ).map(([k, v]) => ({
    ...v,
    id: k,
  }));
  return { ...room, players };
}
export function useRoom(roomId: string): UseRoomReturn {
  const [roomData, loading, error] = useObjectVal<Room>(
    db.ref(`rooms/${roomId}`),
    {
      transform: transformRoom,
    }
  );
  const [user, authloading, autherror] = useUser();
  const room = useMemo(
    () =>
      roomData && user ? new RoomClass(roomId, user.uid, roomData) : undefined,
    [roomData]
  );
  useBeforeunload(() => {
    room?.leaveRoom();
  });

  return {
    loading: loading || authloading,
    room,
  };
}
