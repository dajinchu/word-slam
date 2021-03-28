import React from "react";
import { Rules } from "../common/Rules";

export function GuesserWaiting() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div>
        The cluemasters are deciding on a secret word. Hang tight!
      </div>
      <Rules />
    </div>
  );
}
