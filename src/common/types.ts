export const wordTypes = [
  "noun",
  "verb",
  "preposition",
  "adjective",
  "spacer",
] as const;
export type WordType = typeof wordTypes[number];

export interface DraggableWord {
  id: string;
  word?: string;
  type: WordType;
}

export type DnDState = Record<string, DraggableWord[]>;

/** Firebase data */
export const teams = ["red", "blue"] as const;
export type Team = typeof teams[number];
export const otherTeam = (team: Team) => (team === "red" ? "blue" : "red");

export type PlayerInfo = { nickname: string; team: Team; id: string };

export type RoomStatus = "lobby" | "game" | "picking" | "postgame";
export type RoomCluemasters = { red?: string; blue?: string };

export type Room = {
  status: RoomStatus;
  players: PlayerInfo[];
  cluemasters?: RoomCluemasters;
  winner?: Team;
};
