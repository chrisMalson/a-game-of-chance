import axios from "axios";
import Link from "next/link";
import { GridList, GridListTile } from "@material-ui/core";

import Header from "../../components/Header";

const Search = ({ games }) => {
  // converts results of API call into clickable elements
  // displays name, database ID, rating (to verify sort order), and first platform in array

  const searchResults = games.map((game) => (
    <GridListTile key={game.id}>
      <Link href="/game/[id]" as={`/game/${game.id}`}>
        <a>
          {game.name}, {game.id}, {game.rating},{" "}
          {game.platforms[0].platform.name}
        </a>
      </Link>
    </GridListTile>
  ));

  return (
    <>
      <Header />
      <GridList cols={4} className="container">
        {searchResults}
      </GridList>
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
    // .filter(game => !!game.rating) // games with rating of 0 tend not to be official releases
    // .sort((a, b) => b.rating - a.rating) // sorted in rating order, largest to smallest
  };
};

export default Search;
