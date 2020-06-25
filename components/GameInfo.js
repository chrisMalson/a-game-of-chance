import parse from "html-react-parser";
import AddGameButton from "../components/AddGameButton";
import RemoveGameButton from "../components/RemoveGameButton";
import ChangePlatformButton from "../components/ChangePlatformButton";
import GamesContext from "../components/GamesContext";

import { useContext } from "react";

const GameInfo = ({ game, id }) => {
  const { games } = useContext(GamesContext);
  const isOnList = games.filter((game) => game.id === id);
  const currentPlatform =
    isOnList.length !== 0 ? isOnList[0].platform : undefined;
  const hasMultiplePlatforms = game.platforms.length > 1;

  return (
    <>
      <h1>{game.name}</h1>
      {parse(game.description)}
      <img
        style={{ width: "300px", height: "200px" }}
        src={game.background_image}
      />
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

export default GameInfo;
