import { useReducer, useEffect } from "react";

import GamesContext from "../../context/GamesContext";
import gameListReducer from "../../reducers/gameList";
import { useUser } from "../auth/useUser";
import firebase from "../../src/firebase";

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
