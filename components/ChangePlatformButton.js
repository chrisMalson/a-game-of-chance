import { useContext, useState } from "react";
import { useRouter } from "next/router";

import GamesContext from "../context/GamesContext";

// when game is already on list, functions similarly to the AddGameButton component
// with same selectable platform logic
const ChangePlatformButton = ({ game, currentPlatform }) => {
  const router = useRouter();
  const { dispatch } = useContext(GamesContext);
  const { name, id } = game;

  const [newPlatform, setNewPlatform] = useState(currentPlatform);

  const availablePlatforms = game.platforms.map((i) => (
    <option key={i.platform.name} value={i.platform.name}>
      {i.platform.name}
    </option>
  ));

  const handleChangePlatform = () => {
    dispatch({ type: "CHANGE_PLATFORM", name, id, platform: newPlatform });
    router.push("/");
  };

  const handleChoosePlatform = (e) => setNewPlatform(e.target.value);

  return (
    <>
      <select defaultValue={currentPlatform} onChange={handleChoosePlatform}>
        {availablePlatforms}
      </select>
      <button onClick={handleChangePlatform}>Change Platform</button>
    </>
  );
};

export default ChangePlatformButton;
