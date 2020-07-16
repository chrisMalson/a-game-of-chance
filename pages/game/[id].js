import axios from "axios";

import Header from "../../components/Header";
import GameInfo from "../../components/GameInfo";
import ReturnToTopButton from "../../components/ReturnToTopButton";

const GamePage = ({ game, id }) => {
  return (
    <>
      <Header />
      <GameInfo game={game} id={id} />
      <ReturnToTopButton />
    </>
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
