import { Draggable, Droppable } from "@dajinchu/react-beautiful-dnd";
import React from "react";
import { EmptyCardSpot, WordCard } from "../common/Cards";
import { DraggableWord } from "../common/types";

export function EditableClueArea({
  clues,
  updateClues,
}: {
  clues: DraggableWord[];
  updateClues: (newClues: DraggableWord[]) => void;
}) {
  return (
    <div className="relative">
      <Droppable droppableId="clues" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="relative flex flex-row justify-center items-center overflow-x-scroll h-36 z-10"
          >
            {clues.map((clue, index) => (
              <Draggable key={clue.id} draggableId={clue.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className="p-0.5 select-none"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    <WordCard
                      word={clue.word}
                      type={clue.type}
                      shadow={snapshot.isDragging}
                      clearButton
                      onClear={() =>
                        updateClues(clues.filter((w) => w.id !== clue.id))
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* <div>Drop clue cards here to describe the secret to your teammates!</div> */}
      {clues.length === 0 && (
        <div className="absolute inset-0 flex flex-row justify-center items-center">
          <div className="p-0.5">
            <EmptyCardSpot />
          </div>
        </div>
      )}
    </div>
  );
}
