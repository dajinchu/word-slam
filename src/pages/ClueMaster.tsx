import React from "react";
import { ClueCard } from "../components/ClueCard";
import { EditableClueArea } from "../components/EditableClueArea";
import { clues, clueTypes } from "../constants";

export function ClueMaster() {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col h-screen">
        <div className="bg-white sticky top-0">
          <div className="flex flex-col items-center py-3 w-full bg-primary">
            <div className="text-white text-sm">The word is</div>
            <div className="text-white text-2xl font-bold">shower curtain</div>
          </div>
          <EditableClueArea />
          <div className="py-2 pl-4 text-lg border-t border-b">Clues</div>
        </div>
      <div className="px-5 bg-gray-100 flex-grow">
        {clueTypes.map((clueType) => (
          <div>
            <div className="pb-2 pt-6 text-lg font-bold">{clueType}s</div>
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: "repeat(auto-fit, 5rem)",
              }}
            >
              {clues[clueType].map((clue) => (
                <ClueCard clue={clue} type={clueType} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
