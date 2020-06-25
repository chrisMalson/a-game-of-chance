import { useReducer, useEffect } from "react";

import firebase from "../../src/firebase";

import GamesContext from "../../components/GamesContext";
import gameListReducer from "../../reducers/gameList";

const ReducerWrapper = (props) => {
  const [games, dispatch] = useReducer(gameListReducer, []);
  const database = firebase.database();

  const { children, uid } = props;

  const authId = uid || "default";

  console.log(uid);

  useEffect(() => {
    (async () => {
      let storedGames;

      if (authId !== "default") {
        const snapshot = await database.ref(`${authId}/`).once("value");
        storedGames = await snapshot.val();
      } else if (!localStorage.getItem("games")) {
        storedGames = JSON.parse(localStorage.getItem("games"));
      }

      console.log(storedGames);

      if (storedGames) {
        dispatch({ type: "BUILD_STORED_LIST", storedGames });
      }
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
