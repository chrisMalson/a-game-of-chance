// as of now, _app.js context provider has a value of { games, dispatch }
// it may be better to use dispatch alone and have a RENDER_GAME_LIST action instead
// just a note for future chris
// PS: if you do, remember to rename to [state, dispatch] in _app.js

import Link from "next/link";
import { useContext } from "react";
import MyContext from "./MyContext";

import RemoveGameButton from "../components/RemoveGameButton";

const GameList = () => {
  const { games } = useContext(MyContext);

  const gameListRender = games.map(game => (
    <h4 key={game.id}>
      <Link href="/game/[id]" as={`/game/${game.id}`}>
        <a>
          {game.name} - {game.platform}
        </a>
      </Link>{" "}
      <RemoveGameButton game={game} />
    </h4>
  ));

  return (
    <>
      <div className="list">{gameListRender}</div>
      <style jsx>{`
        .list {
          margin: 10%;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default GameList;
