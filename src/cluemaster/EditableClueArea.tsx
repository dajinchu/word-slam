import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "@dajinchu/react-beautiful-dnd";
import React from "react";
import { EmptyCardSpot, WordCard } from "../common/Cards";
import { DraggableWord } from "../common/types";

function patchStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
): DraggingStyle | NotDraggingStyle | undefined {
  if (!snapshot.isDropAnimating || !snapshot.dropAnimation) {
    return style;
  }
  const { moveTo } = snapshot.dropAnimation;
  console.log(moveTo);
  const translate = `translate(${moveTo.x - 78 / 2}px, ${moveTo.y}px)`;

  // patching the existing style
  return {
    ...style,
    transform: `${translate}`,
  };
}
export function EditableClueArea({ clues }: { clues: DraggableWord[] }) {
  return (
    <div className="relative">
      <Droppable droppableId="clues" direction="horizontal">
        {(provided, snapshot) => (
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
                    style={patchStyle(provided.draggableProps.style, snapshot)}
                  >
                    <WordCard
                      word={clue.word}
                      type={clue.type}
                      shadow={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
