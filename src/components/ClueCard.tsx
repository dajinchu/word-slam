import { ClueType } from "../constants";

const bgClass: { [key in ClueType]: string } = {
  noun: "bg-noun",
  verb: "bg-verb",
  preposition: "bg-preposition",
  adjective: "bg-adjective",
};
export function ClueCard({ clue, type }: { clue: string; type: ClueType }) {
  return (
    <div className={`w-20 h-20 rounded shadow ${bgClass[type]} flex justify-center items-center`}>
      <span className="text-center">{clue}</span>
    </div>
  );
}

export function EmptyCardSpot() {
  return <div className="w-20 h-20 rounded shadow-inner bg-gray-50" />;
}
