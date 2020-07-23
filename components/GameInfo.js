import {
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useContext } from "react";

import AddGameButton from "./AddGameButton";
import ChangePlatformButton from "./ChangePlatformButton";
import GamesContext from "../context/GamesContext";
import RemoveGameButton from "./RemoveGameButton";

const useStyles = makeStyles((theme) => ({
  description: {
    padding: "1em",
  },
  hr: {
    marginTop: "1em",
  },
  image: {
    boxShadow: `1px 1px 1px ${theme.palette.secondary.main}`,
    height: "auto",
    // margin: "1.5rem 0",
    maxWidth: "500px",
    width: "100%",
  },
  paper: {
    margin: "20px",
    padding: "20px",
  },
  vr: {
    // margin: "0 1em",
  },
}));

// currently displays name, description, and a related image

// uses info fetched from API call at page level to display game info on the page
// if game is not on list, AddGameButton will display
// if game is on list, RemoveGameButton will display
// if game has multiple available platforms, ChangePlatformButton will display
const GameInfo = ({ game, id }) => {
  const { games } = useContext(GamesContext);
  const theme = useTheme();
  const { description, hr, image, paper, vr } = useStyles();

  // will display vertically in mobile and horizontally on desktop
  const gridDirection = useMediaQuery(theme.breakpoints.up("md"))
    ? "row"
    : "column";

  // will return empty array if game is not on list
  const isOnList = games.filter((game) => game.id === id);

  // ternary check in case platform is not defined in API fetch, to avoid throwing error
  const currentPlatform =
    isOnList.length !== 0 ? isOnList[0].platform : undefined;
  const hasMultiplePlatforms = game.platforms.length > 1;

  const gameImage =
    game.background_image === null
      ? `https://via.placeholder.com/480/908a99/b5b6e4?text=video+games`
      : game.background_image;

  return (
    <Paper className={paper} variant="outlined">
      <Grid container direction={gridDirection} spacing={2}>
        <Grid
          container
          item
          xs={12}
          md={6}
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography align="center" variant="h5">
              {game.name}
            </Typography>
            <Divider className={hr} />
          </Grid>
          <Grid item>
            <img className={image} src={gameImage} />
          </Grid>
        </Grid>
        {gridDirection === "row" && (
          <Grid item md>
            <Divider className={vr} orientation="vertical" />
          </Grid>
        )}
        <Grid
          container
          item
          xs={12}
          md={6}
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            {isOnList.length === 0 ? (
              <AddGameButton game={{ ...game, background_image: gameImage }} />
            ) : (
              <Grid container item direction="column" alignItems="center">
                <Grid item>
                  {hasMultiplePlatforms ? (
                    <ChangePlatformButton
                      game={game}
                      currentPlatform={currentPlatform}
                    />
                  ) : (
                    <Typography variant="body1" gutterBottom>
                      {currentPlatform}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <RemoveGameButton game={game} />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item>
            <Divider className={hr} />
            <Typography className={description} variant="body1">
              {game.description_raw}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GameInfo;
