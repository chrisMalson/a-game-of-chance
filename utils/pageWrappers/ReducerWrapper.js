import { useReducer, useEffect } from "react";

import firebase from "../../src/firebase";

import GamesContext from "../../components/GamesContext";
import gameListReducer from "../../reducers/gameList";
import { useFirebaseAuth } from "../auth/hooks";

const ReducerWrapper = ({ children }) => {
  const [games, dispatch] = useReducer(gameListReducer, []);
  const database = firebase.database();

  const getAuthUserId = () => {
    const { user } = useFirebaseAuth();

    if (user) {
      return user.uid;
    }
  };

  const authId = getAuthUserId() || "default";

  console.log(authId);

  useEffect(() => {
    (async () => {
      const storedGames =
        authId !== "default"
          ? await database.ref(`${authId}/`).once("value")
          : JSON.parse(localStorage.getItem("games"));

      dispatch({ type: "BUILD_STORED_LIST", storedGames });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (authId !== "default") {
        await database.ref(`${authId}/`).set(games);
      }

      localStorage.setItem("games", JSON.stringify(games));
    })();
  }, [games]);

  return (
    <GamesContext.Provider value={{ games, dispatch }}>
      {children}
    </GamesContext.Provider>
  );
};
export default ReducerWrapper;
