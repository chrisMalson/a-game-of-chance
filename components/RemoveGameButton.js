import { useContext } from "react";
import { useRouter } from "next/router";

import GamesContext from "../context/GamesContext";

// removes the game when you click the button
const RemoveGameButton = ({ game }) => {
  const router = useRouter();
  const { dispatch } = useContext(GamesContext);
  const { id } = game;

  const handleRemoveGame = () => {
    dispatch({ type: "REMOVE_GAME", id });

    router.push("/");
  };

  return <button onClick={handleRemoveGame}>Remove Game</button>;
};

export default RemoveGameButton;
