// as of now, _app.js context provider has a value of { games, dispatch }
// it may be better to use dispatch alone and have a RENDER_GAME_LIST action instead
// just a note for future chris
// PS: if you do, remember to rename to [state, dispatch] in _app.js

import { useContext } from "react";
import MyContext from "./MyContext";

const GameList = () => {
  const { games } = useContext(MyContext);

  return (
    <>
      <div className="list">
        {games.map(game => (
          <h4 key={game.id}>
            {game.name}, {game.id}
          </h4>
        ))}
      </div>
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
