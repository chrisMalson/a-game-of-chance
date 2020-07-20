import { useEffect, useReducer } from "react";

import firebase from "../../src/firebase";
import gameListReducer from "../../reducers/gameList";
import GamesContext from "../../context/GamesContext";
import { useUser } from "../auth/useUser";

const GamesReducer = ({ children }) => {
  const [games, dispatch] = useReducer(gameListReducer, []);
  const database = firebase.database();
  const { user } = useUser();
  const id = user ? user.id : null;

  useEffect(() => {
    (async () => {
      let storedGames;

      if (id) {
        const snapshot = await database.ref(`${id}/`).once("value");
        storedGames = snapshot.val();
      }

      if (storedGames) {
        dispatch({ type: "BUILD_STORED_LIST", storedGames });
      }
    })();
  }, [user]);

  useEffect(() => {
    if (id) {
      database.ref(`${id}/`).set(games);
      // localStorage.setItem("games", JSON.stringify({ id: id, games: games}));
    }
  }, [games]);

  return (
    <GamesContext.Provider value={{ games, dispatch }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesReducer;
