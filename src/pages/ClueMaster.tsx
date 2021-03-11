import React, { useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { WordCard } from "../components/Cards";
import { EditableClueArea } from "../components/EditableClueArea";
import { words, wordTypes } from "../constants";
import { DraggableClue } from "../dnd";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function handleDropResult(
  clues: DraggableClue[],
  result: DropResult
): DraggableClue[] {
  const { source, combine, destination } = result;
  if (combine) {
    const newItems = Array.from(clues);
    const destIndex = newItems.findIndex((i) => i.id === combine.draggableId);
    newItems[destIndex] = newItems[source.index];
    newItems.splice(source.index, 1);
    return newItems;
  } else if (destination) {
    return reorder(clues, source.index, destination.index);
  } else {
    return clues;
  }
}

const DEFAULT: DraggableClue[] = [
  { id: "dfjis", word: "dfjsio" },
  { id: "2", word: "other item" },
  { id: "4" },
  { id: "jifdos", word: "last item" },
];

export function ClueMaster() {
  const [clues, setClues] = useState<DraggableClue[]>(DEFAULT);

  const onDragEnd = useCallback(
    (result: DropResult) =>
      setClues((clues) => handleDropResult(clues, result)),
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
          <div className="py-2 pl-4 text-lg border-t border-b">Clues</div>
        </div>
        <div className="px-5 bg-gray-100 flex-grow">
          {wordTypes.map((clueType) => (
            <div>
              <div className="pb-2 pt-6 text-lg font-bold">{clueType}s</div>
              <Droppable
                droppableId={clueType}
                isDropDisabled
                direction="horizontal"
                renderClone={(provided, snapshot, rubric) => (
                  <>
                    <div
                      className="select-none"
                      ref={provided.innerRef}
                      style={provided.draggableProps.style}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <WordCard
                        clue={words[clueType][rubric.source.index]}
                        type={clueType}
                      />
                    </div>
                  </>
                )}
              >
                {(provided, snapshot) => (
                  <div
                    // {...provided.droppableProps}
                    ref={provided.innerRef}
                    // className="flex flex-row flex-wrap"
                    className="grid gap-1"
                    style={{ gridTemplateColumns: "repeat(auto-fit, 5rem)" }}
                  >
                    {words[clueType].map((clue, idx) => {
                      const shouldRenderClone =
                        clue === snapshot.draggingFromThisWith;
                      return (
                        <React.Fragment key={clue}>
                          {shouldRenderClone ? (
                            <div className="react-dnd-clone">
                              <WordCard clue={clue} type={clueType} />
                            </div>
                          ) : (
                            <Draggable draggableId={clue} index={idx}>
                              {(provided, snapshot) => (
                                <div
                                  className="select-none"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <WordCard clue={clue} type={clueType} />
                                </div>
                              )}
                            </Draggable>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
