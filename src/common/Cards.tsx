import { WordType } from "./types";

const bgClass: { [key in WordType]: string } = {
  noun: "bg-noun",
  verb: "bg-verb",
  preposition: "bg-preposition",
  adjective: "bg-adjective",
  spacer: "bg-gray-50",
};
export function WordCard({
  word,
  type,
  shadow = false,
}: {
  word?: string;
  type: WordType;
  shadow?: boolean;
}) {
  return (
    <div
      className={`w-20 h-20 rounded 
      ${shadow && "shadow"} ${
        bgClass[type]
      } border flex justify-center items-center`}
    >
      <span className="text-center text-sm">{word}</span>
    </div>
  );
}

export function EmptyCardSpot() {
  return <div className="w-20 h-20 rounded shadow-inner bg-gray-100" />;
}
