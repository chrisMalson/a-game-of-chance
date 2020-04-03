// separate component for clarity
// it may make more sense to have a separate actions file and import that,
// to eliminate the need for multiple useContext calls. Revisit?

import { useContext, useState } from "react";
import { useRouter } from "next/router";
import MyContext from "./MyContext";

const AddGameButton = ({ game }) => {
  const router = useRouter();
  const { dispatch } = useContext(MyContext);
  const { name, id } = game;
  const [platform, setPlatform] = useState(game.platforms[0].platform.name);

  const availablePlatforms = game.platforms.map(i => (
    <option key={i.platform.name} value={i.platform.name}>
      {i.platform.name}
    </option>
  ));

  const handleAddGame = () => {
    dispatch({ type: "ADD_GAME", name, id, platform });
    router.push("/");
  };

  const handleChoosePlatform = e => setPlatform(e.target.value);

  return (
    <>
      <select onChange={handleChoosePlatform}>{availablePlatforms}</select>
      <button onClick={handleAddGame}>Add Game to List</button>
    </>
  );
};

export default AddGameButton;
