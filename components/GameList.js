// as of now, _app.js context provider has a value of { games, dispatch }
// it may be better to use dispatch alone and have a RENDER_GAME_LIST action instead
// just a note for future chris
// PS: if you do, remember to rename to [state, dispatch] in _app.js

import Link from "next/link";
import { Paper } from "@material-ui/core";
import { useContext } from "react";
import GamesContext from "./GamesContext";

const GameList = () => {
  const { games, dispatch } = useContext(GamesContext);

  const gameListRender = games
    .filter((game) => game.isVisible)
    .map((game) => (
      <h4 key={game.id}>
        <Link href="/game/[id]" as={`/game/${game.id}`}>
          <a>
            {game.name} - {game.platform}
          </a>
        </Link>
      </h4>
    ));

  return (
    <>
      <div className="list">
        <Paper variant="elevation" elevation={12}>
          {gameListRender}
        </Paper>
      </div>
      <style jsx>{`
        .list {
          background-color: #ddd;
          margin: 10%;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default GameList;
