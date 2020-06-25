import axios from "axios";

import GameInfo from "../../components/GameInfo";
import GamesReducer from "../../utils/pageWrappers/GamesReducer";

const GamePage = ({ game, id }) => {
  return (
    <GamesReducer>
      <GameInfo game={game} id={id} />
    </GamesReducer>
  );
};

// getStaticProps would have required getStaticPaths = revisit? TODO
GamePage.getInitialProps = async (context) => {
  const { id } = context.query; // from /game/id

  const url = `https://api.rawg.io/api/games/${id}`;
  const { data } = await axios({
    method: "get",
    url,
    headers: {
      "User-Agent": "a-game-of-chance", // RAWG.io requires this for their API calls
    },
  });

  return {
    game: data,
    id: parseInt(id, 10),
  };
};

export default GamePage;
