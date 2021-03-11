import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React from "react";
import { WordCard, EmptyCardSpot } from "./Cards";
import { DraggableClue } from "../dnd";

export function EditableClueArea({ clues }: { clues: DraggableClue[] }) {
  return (
    <div>
      <Droppable
        droppableId="droppable"
        isCombineEnabled
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row p-2"
          >
            {clues.map((clue, index) => (
              <Draggable key={clue.id} draggableId={clue.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className="m-2 select-none"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    {clue.word ? (
                      <WordCard clue={clue.word} type="noun" />
                    ) : (
                      <EmptyCardSpot />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
