// separate component for clarity
// it may make more sense to have a separate actions file and import that,
// to eliminate the need for multiple useContext calls. Revisit?

// THINGS TO FIX:

// 1. adds the item to the end of the list rather than changing it in place - fix reducer?
// 2. fix useState call below to set default to current platform

import { useContext, useState } from "react";
import { useRouter } from "next/router";
import MyContext from "./MyContext";

const ChangePlatformButton = ({ game, currentPlatform }) => {
  const router = useRouter();
  const { dispatch } = useContext(MyContext);
  const { name, id } = game;

  const [newPlatform, setNewPlatform] = useState(currentPlatform);

  const availablePlatforms = game.platforms.map(i => (
    <option key={i.platform.name} value={i.platform.name}>
      {i.platform.name}
    </option>
  ));

  const handleChangePlatform = () => {
    dispatch({ type: "CHANGE_PLATFORM", name, id, platform: newPlatform });
    router.push("/");
  };

  const handleChoosePlatform = e => setNewPlatform(e.target.value);

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
