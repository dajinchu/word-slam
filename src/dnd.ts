/** Drag and drop stuff */

import { WordType } from "./constants";

export interface DraggableWord {
  id: string;
  word?: string;
  type: WordType;
}

export type DnDState = Record<string, DraggableWord[]>;
