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
    <div>
      <div className="relative">
        <div className="z-10">
          <Droppable droppableId="clues" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex flex-row h-32 ${clues.length===0 ? 'w-80 mx-auto':''} justify-center items-center`}
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
        </div>
        {clues.length === 0 && (
          <div className="absolute inset-0 flex flex-row justify-center items-center bg-white">
            <div className="p-0.5">
              <EmptyCardSpot />
            </div>
          </div>
        )}
      </div>
      <div className="text-center mb-2 text-gray-500 text-sm">Drag clue cards here to describe the secret to your teammates! Click Got It if your teammate guesses the secret!</div>
    </div>
  );
}
