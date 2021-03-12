import { Draggable, Droppable } from "react-beautiful-dnd";
import React from "react";
import { WordCard, EmptyCardSpot } from "./Cards";
import { DraggableWord } from "../dnd";
import { wordTypes } from "../constants";

export function EditableClueArea({ clues }: { clues: DraggableWord[] }) {
  return (
    <div>
      <Droppable droppableId="clues" direction="horizontal">
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
                    <WordCard word={clue.word} type={clue.type} />
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
