import axios from "axios";
import Link from "next/link";

import withAuthUser from "../../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../../utils/pageWrappers/withAuthUserInfo";

// getStaticProps would have required getStaticPaths = revisit?
export const getServerSideProps = async (context) => {
  const { value } = context.query; // from /search/[value]
  const url = `https://api.rawg.io/api/games?search=${value}&page_size=10`; //revisit page size
  const { data } = await axios({
    method: "get",
    url,
    headers: {
      "User-Agent": "a-game-of-chance", // RAWG.io requires this for their API calls
    },
  });

  return {
    props: {
      games: data.results,
      // .filter(game => !!game.rating) // games with rating of 0 tend not to be official releases
      // .sort((a, b) => b.rating - a.rating) // sorted in rating order, largest to smallest
    },
  };
};

const Search = (props) => {
  // converts results of API call into clickable elements
  // displays name, database ID, rating (to verify sort order), and first platform in array
  const searchResults = props.games.map((game) => (
    <Link key={game.id} href="/game/[id]" as={`/game/${game.id}`}>
      <a>
        {game.name}, {game.id}, {game.rating}, {game.platforms[0].platform.name}
      </a>
    </Link>
  ));

  return (
    <>
      <div className="container">{searchResults}</div>
      <style jsx>{`
        .container {
          justify-content: center;
          display: flex;
          flex-direction: column;
          margin: 5%;
        }
      `}</style>
    </>
  );
};

export default withAuthUser(withAuthUserInfo(Search));
