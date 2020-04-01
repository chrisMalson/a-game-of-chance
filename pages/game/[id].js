import axios from "axios";

import GameInfo from "../../components/GameInfo";
import AddGameButton from "../../components/AddGameButton";

// getStaticProps would have required getStaticPaths = revisit?
export const getServerSideProps = async context => {
  const { id } = context.query; // from /game/id

  const url = `https://api.rawg.io/api/games/${id}`;
  const { data } = await axios({
    method: "get",
    url,
    headers: {
      "User-Agent": "a-game-of-chance" // RAWG.io requires this for their API calls
    }
  });

  return {
    props: {
      game: data
    }
  };
};

// currently displays name, description, and a related image
// description property was in HTML format; needed html-react-parser to display text without <p> tags
const GamePage = ({ game }) => (
  <>
    <GameInfo game={game} />
    <AddGameButton game={game} />
  </>
);

export default GamePage;
