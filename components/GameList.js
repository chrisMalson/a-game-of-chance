import { useContext } from "react";
import Link from "next/link";
import {
  Box,
  Paper,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

import FilterOptions from "../components/FilterOptions";
import GamesContext from "../context/GamesContext";

// TODO: store link to image in database along with rest of info, to use in gameList render

// pretty self-explanatory; this component renders the game list to the DOM
const GameList = () => {
  const { games } = useContext(GamesContext);
  const columns = useMediaQuery("(min-width:600px)") ? 2 : 1;

  const gameListRender = games
    .filter((game) => game.isVisible)
    .map((game) => (
      <GridListTile key={game.id}>
        <Link href="/game/[id]" as={`/game/${game.id}`}>
          <a>
            <img
              style={{
                height: "100%",
                minWidth: "100%",
                objectPosition: "50% 50%",
                objectFit: "cover",
              }}
              src={game.background_image}
            />
            <GridListTileBar title={game.name} subtitle={game.platform} />
          </a>
        </Link>
      </GridListTile>
    ));

  return (
    <Grid container direction="row" justify="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper variant="outlined">
          <FilterOptions />
          <GridList cols={columns}>{gameListRender}</GridList>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameList;
