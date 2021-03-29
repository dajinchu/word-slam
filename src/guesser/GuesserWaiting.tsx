import React from "react";
import { RulesCard } from "../common/RulesCard";

export function GuesserWaiting() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="mt-10 mb-5">
        The cluemasters are deciding on a secret word. Hang tight!
      </div>
      <RulesCard />
    </div>
  );
}
