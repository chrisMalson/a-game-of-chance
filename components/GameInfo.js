import { useContext } from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import parse from "html-react-parser"; // used to parse HTML format into plain text for use with JSX

import AddGameButton from "./AddGameButton";
import ChangePlatformButton from "./ChangePlatformButton";
import GamesContext from "../context/GamesContext";
import RemoveGameButton from "./RemoveGameButton";

// currently displays name, description, and a related image
// description property was in HTML format; needed html-react-parser to display text without <p> tags

// uses info fetched from API call at page level to display game info on the page
// if game is not on list, AddGameButton will display
// if game is on list, RemoveGameButton will display
// if game has multiple available platforms, ChangePlatformButton will display
const GameInfo = ({ game, id }) => {
  const { games } = useContext(GamesContext);
  const isOnList = games.filter((game) => game.id === id);
  const currentPlatform =
    isOnList.length !== 0 ? isOnList[0].platform : undefined;
  const hasMultiplePlatforms = game.platforms.length > 1;

  return (
    <Paper>
      <Grid container direction="column">
        <Typography variant="h3">{game.name}</Typography>
        <img
          style={{ width: "300px", height: "200px" }}
          src={game.background_image}
        />
        {isOnList.length === 0 ? (
          <AddGameButton game={game} />
        ) : (
          <>
            {hasMultiplePlatforms ? (
              <ChangePlatformButton
                game={game}
                currentPlatform={currentPlatform}
              />
            ) : (
              <Typography variant="body1">{currentPlatform}</Typography>
            )}
            <RemoveGameButton game={game} />
          </>
        )}
        <Typography variant="body1">{parse(game.description)}</Typography>
      </Grid>
    </Paper>
  );
};

export default GameInfo;
