import { useState, useContext } from "react";
import { Modal } from "@material-ui/core";

import GamesContext from "../context/GamesContext";

// MaterialUI's Modal requires useState for open/closed functionality
// The button will only pick visible games; any games filtered out by platform will not appear as a choice
const PickRandomGameButton = () => {
  const { games } = useContext(GamesContext);
  const [open, setOpen] = useState(false);
  const [chosenGame, setChosenGame] = useState("");

  const handleChooseGame = () => {
    const filteredGames = games
      .filter((game) => game.isVisible)
      .map((game) => game.name);

    setChosenGame(
      filteredGames[Math.floor(Math.random() * filteredGames.length)]
    );

    setOpen(true);
  };

  return (
    <>
      <button onClick={handleChooseGame}>
        <h3>Choose a game for me to play!</h3>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {
          <div style={{ background: "white", textAlign: "center" }}>
            <h4>You should play</h4>
            <h2>{chosenGame}</h2>
          </div>
        }
      </Modal>
      <style jsx>{`
        margin: 5%;
      `}</style>
    </>
  );
};

export default PickRandomGameButton;
