import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@dajinchu/react-beautiful-dnd";
import { DictionarySection } from "./DictionarySection";
import { EditableClueArea } from "./EditableClueArea";
import { dictionary } from "../common/constants";
import { DnDState, DraggableWord, Team, WordType } from "../common/types";
import { mapValues } from "../common/utils";
import { db } from "../common/db";
import { useObjectVal } from "react-firebase-hooks/database";

function handleDropResult(
  clues: DraggableWord[],
  dictionary: DnDState,
  result: DropResult
): DraggableWord[] {
  const { source, destination } = result;
  if (destination && destination.droppableId === "clues") {
    if (source.droppableId === "clues") {
      const sourceDraggable = clues[source.index];
      const newClues = [...clues];
      newClues.splice(source.index, 1);
      newClues.splice(destination.index, 0, sourceDraggable);
      return newClues;
    } else {
      const sourceDroppable = dictionary[source.droppableId];
      const sourceDraggable = sourceDroppable[source.index];

      const newClues = [...clues];
      newClues.splice(destination.index, 0, sourceDraggable);
      return newClues;
    }
  } else {
    return clues;
  }
}

const DRAGGABLE_DICTIONARY: DnDState = mapValues(
  dictionary,
  (words, wordType) =>
    words.map((word) =>
      wordType === "spacer"
        ? { id: "0", type: wordType }
        : { word: word, id: word, type: wordType }
    )
);

const empty : DraggableWord[] = []
export function ClueMasterGame({
  roomId,
  team,
}: {
  roomId: string;
  team: Team;
}) {
  const [dbClues, loading] = useObjectVal<DraggableWord[]>(
    db.ref(`clues/${roomId}/${team}`)
  );
  const clues = dbClues || empty;
  const dictionary = mapValues(DRAGGABLE_DICTIONARY, (dw) =>
    dw.filter((w) => !clues?.find((w2) => w.id === w2.id))
  );

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const newClues = handleDropResult(clues, dictionary, result);
      // TODO: Implmement local state caching SWR style
      await db.setClues(roomId, team, newClues);
    },
    [clues, dictionary, roomId, team]
  );

  if (typeof clues === "undefined") {
    return null;
  }
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col min-h-screen">
      <DragDropContext onDragEnd={onDragEnd} autoScroll={false}>
        <div className="bg-white sticky top-0">
          <div
            className={`flex flex-col items-center py-3 w-full ${
              team === "red" ? "bg-redteam" : "bg-blueteam"
            }`}
          >
            <div className="text-white text-sm">The word is</div>
            <div className="text-white text-2xl font-bold">shower curtain</div>
          </div>
          <EditableClueArea clues={clues} />
          <div className="px-4 py-2 text-lg border-t border-b">
            Clue Dictionary
          </div>
        </div>
        <div className="px-4 bg-gray-100 flex-grow">
          {Object.entries(dictionary).map(([wordType, words]) => (
            <div key={wordType}>
              <div className="pb-2 pt-6 text-lg font-bold">{wordType}s</div>
              <DictionarySection
                words={words}
                wordType={wordType as WordType}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
