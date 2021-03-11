import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import React, { useCallback, useState } from "react";
import { ClueCard, EmptyCardSpot } from "./ClueCard";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function handleDropResult(items: Item[], result: DropResult): Item[] {
  const { source, combine, destination } = result;
  if (combine) {
    const newItems = Array.from(items);
    const destIndex = newItems.findIndex((i) => i.id === combine.draggableId);
    newItems[destIndex] = newItems[source.index];
    newItems.splice(source.index, 1);
    return newItems;
  } else if (destination) {
    return reorder(items, source.index, destination.index);
  } else {
    return items;
  }
}

interface Item {
  id: string;
  content?: string;
}

const DEFAULT: Item[] = [
  { id: "dfjis", content: "dfjsio" },
  { id: "2", content: "other item" },
  { id: "4" },
  { id: "jifdos", content: "last item" },
];

export function EditableClueArea() {
  const [items, setItems] = useState(DEFAULT);

  const onDragEnd = useCallback(
    (result: DropResult) =>
      setItems((items) => handleDropResult(items, result)),
    []
  );

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
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
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="m-2 select-none"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      {item.content ? (
                        <ClueCard clue={item.content} type="noun" />
                      ) : (
                        <EmptyCardSpot />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
