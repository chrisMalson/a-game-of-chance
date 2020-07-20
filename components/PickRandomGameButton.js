import { Button, Fab, Grid, Modal, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useContext } from "react";

import GamesContext from "../context/GamesContext";

// TODO: convert Modal to Dialog as per Material-UI recommendation

const useStyles = makeStyles((theme) => ({
  image: {
    height: "50vw",
    maxHeight: "300px",
    objectFit: "cover",
    objectPosition: "50% 50%",
    width: "100%",
  },
  modal: {
    margin: "5%",
    [theme.breakpoints.up("sm")]: {
      margin: "5% 20%",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

// MaterialUI's Modal requires useState for open/closed functionality
// The button will only pick visible games; any games filtered out by platform will not appear as a choice

// TODO: add X button to top right of modal
const PickRandomGameButton = () => {
  const { games } = useContext(GamesContext);
  const [open, setOpen] = useState(false);
  const [chosenGame, setChosenGame] = useState("");
  const { modal, paper, image } = useStyles();

  const handleChooseGame = () => {
    const filteredGames = games.filter((game) => game.isVisible);
    const rawChosenGame =
      filteredGames[Math.floor(Math.random() * filteredGames.length)];

    // if the game name exceeds 40 characters, the name will be shortened
    const truncatedName =
      rawChosenGame.name.length > 40
        ? `${rawChosenGame.name.split("").slice(0, 39).join("")}...`
        : rawChosenGame.name;

    setChosenGame({ ...rawChosenGame, name: truncatedName });

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
      <Modal className={modal} open={open} onClose={() => setOpen(false)}>
        {
          <Paper className={paper} onClick={() => setOpen(false)}>
            <Typography variant="h5">You should play...</Typography>
            <img src={chosenGame.background_image} className={image} />
            <Typography variant="h3" gutterBottom>
              {chosenGame.name}
            </Typography>
            <Button fullWidth variant="contained" color="primary">
              <Typography color="textPrimary" variant="h2">
                OK!
              </Typography>
            </Button>
          </Paper>
        }
      </Modal>
    </Grid>
  );
};

export default PickRandomGameButton;
