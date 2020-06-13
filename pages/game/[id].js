import axios from "axios";
import { useContext } from "react";

import GameInfo from "../../components/GameInfo";
import AddGameButton from "../../components/AddGameButton";
import RemoveGameButton from "../../components/RemoveGameButton";
import ChangePlatformButton from "../../components/ChangePlatformButton";
import GamesContext from "../../components/GamesContext";
import withAuthUser from "../../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../../utils/pageWrappers/withAuthUserInfo";

// currently displays name, description, and a related image
// description property was in HTML format; needed html-react-parser to display text without <p> tags
const GamePage = ({ game, id }) => {
  const { games } = useContext(GamesContext);
  const isOnList = games.filter((game) => game.id === id);
  const currentPlatform =
    isOnList.length !== 0 ? isOnList[0].platform : undefined;
  const hasMultiplePlatforms = game.platforms.length > 1;

  return (
    <>
      <GameInfo game={game} />
      {isOnList.length === 0 ? (
        <AddGameButton game={game} />
      ) : (
        <>
          {hasMultiplePlatforms && (
            <ChangePlatformButton
              game={game}
              currentPlatform={currentPlatform}
            />
          )}
          <RemoveGameButton game={game} />
        </>
      )}
    </>
  );
};

// getStaticProps would have required getStaticPaths = revisit?
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

  console.log(data);

  return {
    props: {
      game: data,
      id: parseInt(id, 10),
    },
  };
};

export default GamePage;
