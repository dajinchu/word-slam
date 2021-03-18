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

export type PlayerInfo = { nickname: string; team: Team };
export type RoomPlayers = Record<string, PlayerInfo>;

export type RoomStatus = "lobby";

export type Room = { status: RoomStatus; players?: RoomPlayers };
