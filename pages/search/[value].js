import axios from "axios";
import Link from "next/link";
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

import Header from "../../components/Header";
import ReturnToTopButton from "../../components/ReturnToTopButton";

const Search = ({ games, value }) => {
  // converts results of API call into clickable elements
  // displays name, database ID, rating (to verify sort order), and first platform in array
  const columns = useMediaQuery("(min-width:600px)") ? 2 : 1;

  const searchResults = games.map((game) => (
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
    <>
      <Header />
      <Box />
      <Typography variant="h4" align="center" gutterBottom>
        Search results for "{value}"
      </Typography>
      <Grid container direction="row" justify="center">
        <Grid item xs={10} sm={8} md={6}>
          <Paper variant="outlined">
            <GridList cols={columns}>{searchResults}</GridList>
          </Paper>
        </Grid>
      </Grid>
      <ReturnToTopButton />
    </>
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
