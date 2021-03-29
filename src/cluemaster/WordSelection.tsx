import { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { Button } from "../common/Button";
import { randStory } from "../common/constants";
import { db } from "../common/db";
import { RoomCluemasters } from "../common/types";

async function newSecret(roomId: string) {
  await db.ref(`secrets/${roomId}`).set(randStory());
}
export function WordSelection({
  roomId,
  cluemasters,
}: {
  roomId: string;
  cluemasters: RoomCluemasters;
}) {
  const [secret, loading] = useObjectVal<string>(db.ref(`secrets/${roomId}`));

  useEffect(() => {
    if (!loading && !secret) {
      newSecret(roomId);
    }
  }, [secret, loading, roomId]);

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col">
      <div className="bg-primary h-40 flex flex-col items-center justify-center">
        <div className="text-sm text-white">the secret is</div>
        <div className="text-3xl text-white font-bold">{secret}</div>
      </div>
      <div className="mt-4 mb-10 px-5">
        Talk to the other cluemaster to agree on this secret! If you want a new
        one, hit veto!
      </div>
      <div className="flex justify-center">
        <Button onClick={() => newSecret(roomId)} size="md" color="secondary">
          Veto
        </Button>
        <div className="ml-10" />
        <Button
          onClick={async () =>
            await db.ref(`rooms/${roomId}/status`).set("game")
          }
          size="md"
        >
          Start
        </Button>
      </div>
    </div>
  );
}
