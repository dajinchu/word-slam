import { WordType } from "../constants";

const bgClass: { [key in WordType]: string } = {
  noun: "bg-noun",
  verb: "bg-verb",
  preposition: "bg-preposition",
  adjective: "bg-adjective",
  spacer: "bg-white"
};
export function WordCard({ word, type }: { word?: string; type: WordType }) {
  return (
    <div className={`w-20 h-20 rounded shadow ${bgClass[type]} flex justify-center items-center`}>
      <span className="text-center text-sm">{word}</span>
    </div>
  );
}

export function EmptyCardSpot() {
  return <div className="w-20 h-20 rounded shadow-inner bg-gray-50" />;
}
