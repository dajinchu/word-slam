import React, { useCallback, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { DictionarySection } from "../components/DictionarySection";
import { EditableClueArea } from "../components/EditableClueArea";
import { dictionary, WordType } from "../constants";
import { DnDState, DraggableWord } from "../dnd";
import { mapValues } from "../utils";

function handleDropResult(state: DnDState, result: DropResult): DnDState {
  const { source, combine, destination } = result;
  /* if (combine) {
    const newItems = Array.from(clues);
    const destIndex = newItems.findIndex((i) => i.id === combine.draggableId);
    newItems[destIndex] = newItems[source.index];
    newItems.splice(source.index, 1);
    return newItems;
  } else */ if (
    destination
  ) {
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

    // if (source.droppableId === 'clues') {
    //   const sourceWord: DraggableWord = state.clues[source.index]
    //   return reorder(clues, source.index, destination.index);
    // } else {
    //   const newItems = Array.from(clues);
    //   //TODO: Actually lookup the word id!
    //   const sourceWord: DraggableWord = dictionary[source.droppableId][source.index]
    //   newItems.splice(destination.index, 0, sourceWord);

    //   return newItems;
    // }
  } else {
    return state;
  }
}

const DEFAULT: DraggableWord[] = [];

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
    clues: DEFAULT,
    ...DRAGGABLE_DICTIONARY,
  });

  const onDragEnd = useCallback(
    (result: DropResult) =>
      setCards((state) => handleDropResult(state, result)),
    []
  );

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col min-h-screen">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="bg-white sticky top-0">
          <div className="flex flex-col items-center py-3 w-full bg-primary">
            <div className="text-white text-sm">The word is</div>
            <div className="text-white text-2xl font-bold">shower curtain</div>
          </div>
          <EditableClueArea clues={clues} />
          <div className="py-2 pl-4 text-lg border-t border-b">
            Clue Dictionary
          </div>
        </div>
        <div className="px-5 bg-gray-100 flex-grow">
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
