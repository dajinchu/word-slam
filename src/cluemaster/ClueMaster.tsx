import React, { useCallback, useState } from "react";
import { DragDropContext, DropResult } from "@dajinchu/react-beautiful-dnd";
import { DictionarySection } from "./DictionarySection";
import { EditableClueArea } from "./EditableClueArea";
import { dictionary } from "../common/constants";
import { DnDState, WordType } from "../common/types";
import { mapValues } from "../common/utils";

function handleDropResult(state: DnDState, result: DropResult): DnDState {
  const { source, destination } = result;
  if (destination) {
    // clone droppable sections
    const sourceDroppable = [...state[source.droppableId]];
    const destDroppable =
      source.droppableId === destination.droppableId
        ? sourceDroppable
        : [...state[destination.droppableId]];

    const sourceDraggable = sourceDroppable[source.index];

    // remove from source
    sourceDroppable.splice(source.index, 1);
    // add to dest
    destDroppable.splice(destination.index, 0, sourceDraggable);

    if (source.droppableId === "spacer") {
      // clone
      sourceDroppable[source.index] = {
        ...sourceDraggable,
        id: parseInt(sourceDraggable.id) + 1 + "",
      };
    }

    return {
      ...state,
      [source.droppableId]: sourceDroppable,
      [destination.droppableId]: destDroppable,
    };
  } else {
    return state;
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

export function ClueMaster() {
  const [{ clues, ...dictionary }, setCards] = useState<DnDState>({
    clues: [],
    ...DRAGGABLE_DICTIONARY,
  });

  const onDragEnd = useCallback(
    (result: DropResult) =>
      setCards((state) => handleDropResult(state, result)),
    []
  );

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col min-h-screen">
      <DragDropContext onDragEnd={onDragEnd} autoScroll={false}>
        <div className="bg-white sticky top-0">
          <div className="flex flex-col items-center py-3 w-full bg-primary">
            <div className="text-white text-sm">The word is</div>
            <div className="text-white text-2xl font-bold">shower curtain</div>
          </div>
          <div className="px-4 mt-4">
            <EditableClueArea clues={clues} />
          </div>
          <div className="px-4 py-2 text-lg border-t border-b">
            Clue Dictionary
          </div>
        </div>
        <div className="px-4 bg-gray-100 flex-grow">
          {Object.entries(dictionary).map(([wordType, words]) => (
            <div>
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
