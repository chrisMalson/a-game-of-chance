import { useState, useContext } from "react";
import { Fab, Grid, Modal, Typography } from "@material-ui/core";

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
    <Grid container spacing={1} justify="center">
      <Grid item>
        <Fab
          size="large"
          variant="extended"
          color="primary"
          onClick={handleChooseGame}
        >
          <Typography variant="h6">Choose a game to play!</Typography>
        </Fab>
      </Grid>
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
    </Grid>
  );
};

export default PickRandomGameButton;
