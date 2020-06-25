import { useContext } from "react";
import Link from "next/link";
import { Paper } from "@material-ui/core";

import GamesContext from "../context/GamesContext";

// pretty self-explanatory; this component renders the game list to the DOM
const GameList = () => {
  const { games } = useContext(GamesContext);

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
