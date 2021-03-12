import React from "react";
import {
  Droppable,
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd";
import { WordType } from "../constants";
import { DraggableWord } from "../dnd";
import { WordCard } from "./Cards";

export function DraggableCard({
  word,
  provided,
}: {
  word: DraggableWord;
  provided: DraggableProvided;
}) {
  return (
    <div
      className="select-none"
      ref={provided.innerRef}
      style={provided.draggableProps.style}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <WordCard word={word.word || ""} type={word.type} />
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
          />
        </>
      )}
    >
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(auto-fit, 5rem)" }}
        >
          {words.map((word, idx) => {
            const shouldRenderClone = word.id === snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={word.id}>
                {shouldRenderClone ? (
                  <div className="react-dnd-clone">
                    <WordCard word={word.word || ""} type={wordType} />
                  </div>
                ) : (
                  <Draggable draggableId={word.id} index={idx}>
                    {(provided) => (
                      <DraggableCard
                        word={word}
                        provided={provided}
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
