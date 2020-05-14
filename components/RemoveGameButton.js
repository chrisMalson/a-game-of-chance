// separate component for clarity
// it may make more sense to have a separate actions file and import that,
// to eliminate the need for multiple useContext calls. Revisit?

import { useContext } from "react";
import { useRouter } from "next/router";
import GamesContext from "./GamesContext";

const RemoveGameButton = ({ game }) => {
  const router = useRouter();
  const { games, dispatch } = useContext(GamesContext);
  const { id } = game;

  const handleRemoveGame = () => {
    dispatch({ type: "REMOVE_GAME", id });

    router.push("/");
  };

  return <button onClick={handleRemoveGame}>Remove Game</button>;
};

export default RemoveGameButton;
