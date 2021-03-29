import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";

export const useUser = () => useAuthState(firebase.auth());
