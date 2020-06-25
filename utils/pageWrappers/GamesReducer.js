import { useReducer, useEffect } from "react";

import GamesContext from "../../context/GamesContext";
import gameListReducer from "../../reducers/gameList";

const GamesReducer = ({ children }) => {
  const [games, dispatch] = useReducer(gameListReducer, []);

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem("games"));

    if (storedGames) {
      dispatch({ type: "BUILD_STORED_LIST", storedGames });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  return (
    <GamesContext.Provider value={{ games, dispatch }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesReducer;
