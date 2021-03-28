import {
  Team,
  DraggableWord,
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
  private userId: string = "";

  setUserId(userId: string) {
    this.userId = userId;
  }

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

  async setClues(room: string, team: Team, clues: DraggableWord[]) {
    return this.ref(`clues/${room}/${team}`).set(clues);
  }
}

export const db = new DB();
