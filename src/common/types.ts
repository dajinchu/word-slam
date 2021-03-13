export const wordTypes = ["noun", "verb", "preposition", "adjective", "spacer"] as const;
export type WordType = typeof wordTypes[number];

export interface DraggableWord {
  id: string;
  word?: string;
  type: WordType;
}

export type DnDState = Record<string, DraggableWord[]>;
