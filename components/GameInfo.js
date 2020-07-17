import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useContext } from "react";

import AddGameButton from "./AddGameButton";
import ChangePlatformButton from "./ChangePlatformButton";
import GamesContext from "../context/GamesContext";
import RemoveGameButton from "./RemoveGameButton";

// currently displays name, description, and a related image

// uses info fetched from API call at page level to display game info on the page
// if game is not on list, AddGameButton will display
// if game is on list, RemoveGameButton will display
// if game has multiple available platforms, ChangePlatformButton will display
const GameInfo = ({ game, id }) => {
  const { games } = useContext(GamesContext);
  const theme = useTheme();

  // will display vertically in mobile and horizontally on desktop
  const gridDirection = useMediaQuery(theme.breakpoints.up("sm"))
    ? "row"
    : "column";

  // will return empty array if game is not on list
  const isOnList = games.filter((game) => game.id === id);

  // ternary check in case platform is not defined in API fetch, to avoid throwing error
  const currentPlatform =
    isOnList.length !== 0 ? isOnList[0].platform : undefined;
  const hasMultiplePlatforms = game.platforms.length > 1;

  return (
    <Box>
      <Grid container direction={gridDirection}>
        <Grid
          container
          item
          xs={12}
          sm={6}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h3">{game.name}</Typography>
          </Grid>
          <Grid item>
            <img
              style={{ width: "300px", height: "200px" }}
              src={game.background_image}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            {isOnList.length === 0 ? (
              <AddGameButton game={game} />
            ) : (
              <Grid container item direction="column" alignItems="center">
                <Grid item>
                  {hasMultiplePlatforms ? (
                    <ChangePlatformButton
                      game={game}
                      currentPlatform={currentPlatform}
                    />
                  ) : (
                    <Typography variant="body1">{currentPlatform}</Typography>
                  )}
                </Grid>
                <Grid item>
                  <RemoveGameButton game={game} />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item>
            <Typography variant="body1">{game.description_raw}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameInfo;
