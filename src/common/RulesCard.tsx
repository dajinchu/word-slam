import React from "react";
import { Rules } from "./Rules";

export const RulesCard = () => (
  <div className="rounded-md border bg-white mb-7">
    <div className="text-lg p-3 border-b">Quick rules</div>
    <div className="p-3">
      <Rules />
    </div>
  </div>
);
