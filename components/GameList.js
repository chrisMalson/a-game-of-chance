import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import {
  Paper,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import FilterOptions from "../components/FilterOptions";
import GamesContext from "../context/GamesContext";

// TODO: store link to image in database along with rest of info, to use in gameList render

// pretty self-explanatory; this component renders the game list to the DOM
const GameList = () => {
  const { games } = useContext(GamesContext);
  const [page, setPage] = useState(1);

  const columns = useMediaQuery("(min-width:600px)") ? 2 : 1;

  // sets page to 1 when games changes
  useEffect(() => setPage(1), [games]);

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

  const s = games.length !== 1 ? "s" : "";

  const pageSize = 10; // TODO: variable page sizes selectable by user
  const pageCount = Math.ceil(gameListRender.length / pageSize);

  const handleChangePage = (e, val) => {
    setPage(val);
  };

  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        {games.length} game{s} backlogged:
      </Typography>
      <Grid container direction="row" justify="center">
        <Grid item xs={10} sm={8} md={6}>
          <Paper variant="outlined">
            <FilterOptions />
            <GridList cols={columns}>
              {gameListRender.slice(
                pageSize * page - pageSize,
                pageSize * page
              )}
            </GridList>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default GameList;
