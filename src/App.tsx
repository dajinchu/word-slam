import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import { Home } from "./home/Home";
import { navigate, RouteComponentProps, Router } from "@reach/router";
import { Room } from "./room/Room";
import { db } from "./common/db";

function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  useEffect(() => {
    db.userId = user?.uid || '';
    if (!user && !loading) {
      firebase
        .auth()
        .signInAnonymously()
        .catch((e) => console.log(e));
    }
  }, [user, loading]);

  return (
    <Router>
      <Home path="/" />
      <ValidatePath
        path="/:roomId"
        validate={({ roomId }) =>
          roomId?.length === 4 && roomId.match(/([A-Z]){4}/) !== null
        }
        component={Room}
      />
    </Router>
  );
}

interface ValidatePathProps<T> extends RouteComponentProps {
  component: (props: RouteComponentProps & T) => JSX.Element | null;
  validate: (a: Partial<T>) => boolean;
}
function ValidatePath<T>({
  component,
  validate,
  ...rest
}: ValidatePathProps<T>) {
  if (validate(rest as Partial<T>)) {
    return <>{component(rest as RouteComponentProps & T)}</>;
  } else {
    navigate("/");
    return null;
  }
}

export default App;
