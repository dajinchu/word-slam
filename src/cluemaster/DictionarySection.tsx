import React from "react";
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from "@dajinchu/react-beautiful-dnd";
import { DraggableWord, WordType } from "../common/types";
import { WordCard } from "../common/Cards";

function patchStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
): DraggingStyle | NotDraggingStyle | undefined {
  if (!snapshot.isDropAnimating || !snapshot.dropAnimation) {
    return style;
  }
  const { moveTo } = snapshot.dropAnimation;
  // Patch the style to offset for the justify-center
  const translate = `translate(${moveTo.x - 82 / 2}px, ${moveTo.y}px)`;

  return {
    ...style,
    transform: `${translate}`,
  };
}

export function DraggableCard({
  word,
  provided,
  snapshot,
}: {
  word: DraggableWord;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) {
  return (
    <div
      className="select-none p-0.5"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={patchStyle(provided.draggableProps.style, snapshot)}
    >
      <WordCard word={word.word || ""} type={word.type} shadow />
    </div>
  );
}

export function DictionarySection({
  words,
  wordType,
}: {
  words: DraggableWord[];
  wordType: WordType;
}) {
  return (
    <Droppable
      droppableId={wordType}
      isDropDisabled
      direction="horizontal"
      renderClone={(provided, snapshot, rubric) => (
        <>
          <DraggableCard
            word={words[rubric.source.index]}
            provided={provided}
            snapshot={snapshot}
          />
        </>
      )}
    >
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-row flex-wrap"
        >
          {words.map((word, idx) => {
            const shouldRenderClone = word.id === snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={word.id}>
                {shouldRenderClone ? (
                  <div className="react-dnd-clone p-0.5">
                    <WordCard word={word.word || ""} type={wordType} shadow />
                  </div>
                ) : (
                  <Draggable draggableId={word.id} index={idx}>
                    {(provided, snapshot) => (
                      <DraggableCard
                        word={word}
                        provided={provided}
                        snapshot={snapshot}
                      />
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
  );
}
