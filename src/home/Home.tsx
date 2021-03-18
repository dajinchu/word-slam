import {  RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { Button } from "../common/Button";
import { db } from "../common/db";
import { Rules } from "../common/Rules";

export function Home(props: RouteComponentProps) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-screen-lg p-5">
      <h1 className="font-bold text-4xl">Word Slam</h1>
      <div className="mt-2">"like charades... but with words"</div>

      <div className="mt-5 mb-2">Quick rules</div>
      <Rules />

      <div className="flex flex-col items-center mt-16">
        <Button
          onClick={async () => {
            const id = await db.createRoom();
            navigate(`/${id}`);
          }}
        >
          new game
        </Button>
        <div className="mt-8" />
        <Button onClick={() => {}}>join game</Button>
      </div>
      <div className="text-center mt-16">
        This is an unofficial online version of the original board game
      </div>
    </div>
  );
}
