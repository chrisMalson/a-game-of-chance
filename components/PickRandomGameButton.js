import { useState, useContext } from "react";
import { Fab, Grid, Modal, Typography, Paper, Button } from "@material-ui/core";

import GamesContext from "../context/GamesContext";

// MaterialUI's Modal requires useState for open/closed functionality
// The button will only pick visible games; any games filtered out by platform will not appear as a choice

// TODO: add X button to top right of modal
const PickRandomGameButton = () => {
  const { games } = useContext(GamesContext);
  const [open, setOpen] = useState(false);
  const [chosenGame, setChosenGame] = useState("");

  const handleChooseGame = () => {
    const filteredGames = games.filter((game) => game.isVisible);

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
          <Paper
            onClick={() => setOpen(false)}
            style={{ background: "white", textAlign: "center" }}
          >
            <Typography variant="h5">You should play...</Typography>
            <img
              src={chosenGame.background_image}
              style={{ width: "500px", height: "auto" }}
            />
            <Typography variant="h3">{chosenGame.name}</Typography>
            <Button fullWidth variant="contained" color="primary">
              <Typography color="textPrimary" variant="h2">
                OK!
              </Typography>
            </Button>
          </Paper>
        }
      </Modal>
      <style jsx>{`
        margin: 5%;
      `}</style>
    </Grid>
  );
};

export default PickRandomGameButton;
