import { Team, DraggableWord } from "./types";
import firebase from "firebase/app";
import { read } from "fs";

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
  userId: string | null = null;

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
    await this.ref(`rooms/${roomId}/players/${this.userId}`).set({team: 'red', nickname});
  }

  async setClues(room: string, team: Team, clues: DraggableWord[]) {
    return this.ref(`clues/${room}/${team}`).set(clues);
  }
}

export const db = new DB();
