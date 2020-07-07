import { useState, useContext } from "react";
import { Button, Modal } from "@material-ui/core";

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
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handleChooseGame}
      >
        <h3>Choose a game for me to play!</h3>
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {
          <div style={{ background: "white", textAlign: "center" }}>
            <h4>You should play</h4>
            <h3>{chosenGame}</h3>
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
