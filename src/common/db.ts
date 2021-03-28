import {
  Team,
  DraggableWord,
  PlayerInfo,
  otherTeam,
  RoomPlayers,
} from "./types";
import firebase from "firebase/app";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function generateId(): string {
  let res = "";
  for (let i = 0; i < 4; i++) {
    res += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return res;
}

class DB {
  // set by App.tsx
  userId: string = "";

  ref(ref: string): firebase.database.Reference {
    return firebase.database().ref(ref);
  }

  async createRoom() {
    let exists = true;
    let id = "";
    while (exists) {
      id = generateId();
      const snapshot = await this.ref(`rooms/${id}/status`).once("value");
      exists = snapshot.exists();
    }
    await this.ref(`rooms/${id}/status`).set("lobby");
    return id;
  }

  async joinRoom(roomId: string, nickname: string) {
    const team = "red";
    const playerinfo: PlayerInfo = { team, nickname };
    await this.ref(`rooms/${roomId}/players/${this.userId}`).set(playerinfo);

    const cluemasterRef = this.ref(`rooms/${roomId}/cluemasters/${team}`);
    const isCluemasterAlready = (await cluemasterRef.once("value")).exists();
    if (!isCluemasterAlready) {
      await this.beCluemaster(roomId, team);
    }
  }

  async switchTeam(roomId: string, newteam: Team) {
    await this.ref(`rooms/${roomId}/players/${this.userId}/team`).set(newteam);

    const oldteam = otherTeam(newteam);
    const cluemasterRef = this.ref(`rooms/${roomId}/cluemasters/${oldteam}`);
    const wasOldCluemaster =
      (await cluemasterRef.once("value")).val() === this.userId;
    if (wasOldCluemaster) {
      // make someone else the cluemaster if someone is there
      const players: RoomPlayers = (
        await this.ref(`rooms/${roomId}/players`).once("value")
      ).val();
      const newCluemaster = Object.entries(players).find(
        ([id, p]) => p.team === oldteam
      )?.[0];
      console.log("cluemaster", newCluemaster);
      await cluemasterRef.set(newCluemaster);
    }
  }

  async beCluemaster(roomId: string, currTeam: Team) {
    await this.ref(`rooms/${roomId}/cluemasters/${currTeam}`).set(this.userId);
  }

  async setClues(room: string, team: Team, clues: DraggableWord[]) {
    return this.ref(`clues/${room}/${team}`).set(clues);
  }
}

export const db = new DB();
