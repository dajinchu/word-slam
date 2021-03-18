const RuleItem = ({ icon, text }: { icon: string; text: string }) => (
  <li className="flex items-baseline my-1">
    <div className="text-lg w-7 flex-shrink-0">{icon}</div>
    <div>{text}</div>
  </li>
);
export const Rules = () => (
  <ul>
    <RuleItem
      icon="💡"
      text="A secret word is chosen, like “brunch” or “astrology.”"
    />
    <RuleItem
      icon="🙊"
      text="Each team’s cluemaster knows the secret, but can’t speak. They have a short list of words to show their team as clues."
    />
    <RuleItem
      icon="🗣"
      text="Read your cluemaster’s clues and guess the secret!"
    />
  </ul>
);
