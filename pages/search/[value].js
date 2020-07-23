import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";

import Header from "../../components/Header";

const useStyles = makeStyles((theme) => ({
  gameTile: {
    "&:hover": {
      transform: "scale(0.98)",
    },
  },
  image: {
    border: `2px solid ${theme.palette.secondary.main}`,
    height: "100%",
    minWidth: "100%",
    objectPosition: "50% 50%",
    objectFit: "cover",
  },
  pageWrapper: {
    minHeight: "100vh",
  },
  paper: {
    padding: "20px",
  },
  resultsText: {
    margin: "20px",
  },
}));

// converts results of API call into clickable elements
// displays name, database ID, rating (to verify sort order), and first platform in array

// TODO: break searchResults out into its own component

const Search = ({ games, value }) => {
  const theme = useTheme();
  const { gameTile, image, pageWrapper, paper, resultsText } = useStyles();
  const columns = useMediaQuery(theme.breakpoints.down("xs")) ? 1 : 2; // single column for mobile

  const searchResults = games.map((game) => {
    const gameImage =
      game.background_image === null
        ? `https://via.placeholder.com/480/908a99/b5b6e4?text=video+games`
        : game.background_image;

    return (
      <GridListTile className={gameTile} key={game.id}>
        <Link href="/game/[id]" as={`/game/${game.id}`}>
          <a>
            <img className={image} src={gameImage} />
            <GridListTileBar title={game.name} subtitle={game.platform} />
          </a>
        </Link>
      </GridListTile>
    );
  });

  return (
    <Box className={pageWrapper}>
      <Header />
      <Typography className={resultsText} variant="h5" align="center">
        Search results for "{value}":
      </Typography>
      {searchResults.length > 0 ? (
        <Grid container direction="row" justify="center">
          <Grid item xs={10} sm={8} md={6}>
            <Paper className={paper} variant="outlined">
              <GridList spacing={10} cols={columns}>
                {searchResults}
              </GridList>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" align="center">
          No results found.
        </Typography>
      )}
    </Box>
  );
};

// getStaticProps would have required getStaticPaths = revisit?
Search.getInitialProps = async (context) => {
  const { value } = context.query; // from /search/[value]
  const url = `https://api.rawg.io/api/games?search=${value}`; // TODO: revisit page size
  const { data } = await axios({
    method: "get",
    url,
    headers: {
      "User-Agent": "a-game-of-chance", // RAWG.io requires this for their API calls
    },
  });

  return {
    games: data.results,
    value,
    // .filter(game => !!game.rating) // games with rating of 0 tend not to be official releases
    // .sort((a, b) => b.rating - a.rating) // sorted in rating order, largest to smallest
  };
};

export default Search;
