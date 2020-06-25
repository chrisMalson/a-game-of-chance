import { useContext, useState } from "react";
import { useRouter } from "next/router";

import GamesContext from "../context/GamesContext";

// renders a button that adds game to list with selectable platform
// lists only available platforms from data fetched via API call
const AddGameButton = ({ game }) => {
  const router = useRouter();
  const { dispatch } = useContext(GamesContext);
  const { name, id } = game;
  const [platform, setPlatform] = useState(game.platforms[0].platform.name);

  const availablePlatforms = game.platforms.map((i) => (
    <option key={i.platform.name} value={i.platform.name}>
      {i.platform.name}
    </option>
  ));

  const handleAddGame = () => {
    dispatch({ type: "ADD_GAME", name, id, platform });
    router.push("/");
  };

  const handleChoosePlatform = (e) => setPlatform(e.target.value);

  return (
    <>
      <select onChange={handleChoosePlatform}>{availablePlatforms}</select>
      <button onClick={handleAddGame}>Add Game to List</button>
    </>
  );
};

export default AddGameButton;
