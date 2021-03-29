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
  clearButton = false,
  onClear,
}: {
  word?: string;
  type: WordType;
  shadow?: boolean;
  clearButton?: boolean;
  onClear?: () => void;
}) {
  return (
    <div
      className={`w-20 h-20 rounded relative
      ${shadow && "shadow"} ${
        bgClass[type]
      } border flex justify-center items-center`}
    >
      {clearButton && (
        <div
          className="absolute z-10 -top-2 -left-2 cursor-pointer p-0.5"
          onClick={onClear}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="fill-current text-gray-500 w-5 h-5"
          >
            <g stroke-linecap="round">
              <path
                d="M46 24a22 22 0 11-44 0 22 22 0 1144 0z"
                stroke="#fff"
                stroke-width="4"
                stroke-linejoin="round"
              />
              <path
                d="M16.222 16.222l15.556 15.556M31.778 16.222L16.222 31.778"
                fill="none"
                fill-opacity=".75"
                fill-rule="evenodd"
                stroke="#fff"
                stroke-width="6"
              />
              <path
                fill="none"
                stroke-width="6"
                stroke-linejoin="round"
                d="M0 0h48v48H0z"
              />
            </g>
          </svg>
        </div>
      )}
      <span className="text-center text-sm">{word}</span>
    </div>
  );
}

export function EmptyCardSpot() {
  return <div className="w-20 h-20 rounded shadow-inner bg-gray-100" />;
}
