import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import "./App.css";
import React, { useState } from "react";

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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

function App() {
  const [items, setItems] = useState(DEFAULT);

  const onDragEnd = (result: DropResult) => {
    setItems((items) => {
      const { source, combine, destination } = result;
      if (combine) {
        const newItems = Array.from(items);
        const destIndex = newItems.findIndex(
          (i) => i.id === combine.draggableId
        );
        newItems[destIndex] = newItems[source.index];
        newItems.splice(source.index, 1);
        return newItems;
      } else if (destination) {
        return reorder(items, source.index, destination.index);
      } else {
        return items;
      }
    });
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" isCombineEnabled>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
