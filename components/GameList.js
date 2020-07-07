import { useContext } from "react";
import Link from "next/link";
import { Box, Paper, Grid, GridList, GridListTile } from "@material-ui/core";

import FilterOptions from "../components/FilterOptions";
import GamesContext from "../context/GamesContext";

// TODO: store link to image in database along with rest of info, to use in gameList render

// pretty self-explanatory; this component renders the game list to the DOM
const GameList = () => {
  const { games } = useContext(GamesContext);

  const gameListRender = games
    .filter((game) => game.isVisible)
    .map((game) => (
      <Box bgcolor="gray" border={1}>
        <GridListTile key={game.id}>
          <Link href="/game/[id]" as={`/game/${game.id}`}>
            <a>
              {game.name} - {game.platform}
            </a>
          </Link>
        </GridListTile>
      </Box>
    ));

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper variant="outlined">
          <FilterOptions />
          <GridList>{gameListRender}</GridList>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameList;
