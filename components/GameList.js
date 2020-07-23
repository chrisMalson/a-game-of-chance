import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import FilterOptions from "../components/FilterOptions";
import GamesContext from "../context/GamesContext";

const useStyles = makeStyles((theme) => ({
  gameTile: {
    "&:hover": {
      transform: "scale(0.98)",
    },
  },
  image: {
    border: `2px solid ${theme.palette.primary.main}`,
    height: "100%",
    minWidth: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%",
  },
  pagination: {
    marginTop: "20px",
  },
  paper: {
    padding: "20px",
  },
}));

// pretty self-explanatory; this component renders the game list to the DOM
const GameList = () => {
  const { games } = useContext(GamesContext);
  const [page, setPage] = useState(1); // for pagination
  const theme = useTheme();
  const { gameTile, image, pagination, paper } = useStyles();

  const columns = useMediaQuery(theme.breakpoints.up("sm")) ? 2 : 1;

  // sets page to 1 when games changes
  useEffect(() => setPage(1), [games]);

  const gameListRender = games
    .filter((game) => game.isVisible) // visibility adjusted by selected platform
    .map((game) => (
      <GridListTile className={gameTile} key={game.id}>
        <Link href="/game/[id]" as={`/game/${game.id}`}>
          <a>
            <img className={image} src={game.background_image} />
            <GridListTileBar title={game.name} subtitle={game.platform} />
          </a>
        </Link>
      </GridListTile>
    ));

  const s = games.length !== 1 ? "s" : "";

  const pageSize = 10; // TODO: variable page sizes selectable by user
  const pageCount = Math.ceil(gameListRender.length / pageSize);

  // 'e' value from onClick destructured into empty object
  const handleChangePage = ({}, val) => {
    setPage(val);
  };

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        {games.length} game{s} backlogged:
      </Typography>
      <Grid container direction="row" justify="center">
        <Grid item xs={10} md={8} xl={6}>
          <Paper className={paper} variant="outlined">
            <FilterOptions />
            <GridList spacing={10} cols={columns}>
              {gameListRender.slice(
                pageSize * page - pageSize,
                pageSize * page
              )}
            </GridList>
            <Pagination
              className={pagination}
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
