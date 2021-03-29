import { useEffect } from "react";
import useLatest from "use-latest";

export function useBeforeunload(handler: (ev: BeforeUnloadEvent) => any) {
  const handlerRef = useLatest(handler);

  useEffect(() => {
    const handleBeforeunload = (event: BeforeUnloadEvent) => {
      let returnValue;
      if (handlerRef.current != null) {
        returnValue = handlerRef.current(event);
      }

      // Chrome requires `returnValue` to be set.
      if (event.defaultPrevented) {
        event.returnValue = "";
      }

      if (typeof returnValue === "string") {
        event.returnValue = returnValue;
        return returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeunload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
