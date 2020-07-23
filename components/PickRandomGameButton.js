import {
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState, useContext } from "react";

import GamesContext from "../context/GamesContext";

// TODO: convert Modal to Dialog as per Material-UI recommendation

const useStyles = makeStyles((theme) => ({
  alert: {
    fontWeight: 600,
  },
  button: {
    padding: "1.5rem",
    margin: "2.5rem 0",
    color: theme.palette.common.white,
  },
  cancel: {
    alignSelf: "flex-end",
  },
  image: {
    border: `2px solid ${theme.palette.primary.main}`,
    height: "50vw",
    marginBottom: "20px",
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
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: theme.spacing(1),
    outline: "none",
  },
}));

// MaterialUI's Modal requires useState for open/closed functionality
// The button will only pick visible games; any games filtered out by platform will not appear as a choice

// TODO: add X button to top right of modal
const PickRandomGameButton = () => {
  const { games } = useContext(GamesContext);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [chosenGame, setChosenGame] = useState("");
  const { alert, button, cancel, modal, paper, image } = useStyles();
  const theme = useTheme();

  const buttonTextSize = useMediaQuery(theme.breakpoints.up("sm")) ? "h6" : "";

  const handleChooseGame = () => {
    const filteredGames = games.filter((game) => game.isVisible);
    if (filteredGames.length === 0) {
      setOpenSnackbar(true);
      return;
    }

    const rawChosenGame =
      filteredGames[Math.floor(Math.random() * filteredGames.length)];

    // if the game name exceeds 40 characters, the name will be shortened
    const truncatedName =
      rawChosenGame.name.length > 40
        ? `${rawChosenGame.name.split("").slice(0, 39).join("")}...`
        : rawChosenGame.name;

    setChosenGame({ ...rawChosenGame, name: truncatedName });

    setOpenModal(true);
  };

  // shorthand due to event parameter being unused
  const handleCloseSnackbar = (...[, reason]) => {
    if (reason !== "clickaway") {
      setOpenSnackbar(false);
    }
  };

  return (
    <Grid container spacing={1} justify="center">
      <Grid item>
        <Button
          className={button}
          fullWidth
          disableElevation
          size="large"
          variant="contained"
          color="primary"
          onClick={handleChooseGame}
          startIcon={<CasinoIcon size="large" />}
        >
          <Typography variant={buttonTextSize}>
            Choose a game to play!
          </Typography>
        </Button>
      </Grid>
      <Modal
        className={modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        {
          <Paper className={paper}>
            <IconButton className={cancel} onClick={() => setOpenModal(false)}>
              <CloseIcon className={cancel} size="large" />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              You should play...
            </Typography>
            <img src={chosenGame.background_image} className={image} />
            <Typography variant="h3" gutterBottom>
              {chosenGame.name}
            </Typography>
            <Button
              className={button}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(false)}
            >
              <Typography variant="h2">OK!</Typography>
            </Button>
          </Paper>
        }
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          className={alert}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          No games to pick from yet!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PickRandomGameButton;
