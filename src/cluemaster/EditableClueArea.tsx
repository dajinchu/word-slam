import { Draggable, Droppable } from "@dajinchu/react-beautiful-dnd";
import { EmptyCardSpot, WordCard } from "../common/Cards";
import { DraggableWord } from "../common/types";
import { times } from "../common/utils";

export function EditableClueArea({ clues }: { clues: DraggableWord[] }) {
  return (
    <div className="relative">
      <Droppable droppableId="clues" direction="horizontal">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="relative flex flex-row h-28 z-10"
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
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="absolute top-0 flex flex-row">
        {times(10, () => (
          <div className="p-0.5">
            <EmptyCardSpot />
          </div>
        ))}
      </div>
    </div>
  );
}
