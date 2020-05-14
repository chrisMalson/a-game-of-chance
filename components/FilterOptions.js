import GamesContext from "./GamesContext";
import { useContext } from "react";

const FilterOptions = () => {
  const { games, dispatch } = useContext(GamesContext);

  const platformList = [...new Set(games.map(({ platform }) => platform))];

  const platformListRender = platformList.map((platform) => (
    <option key={platform} value={platform}>
      {platform}
    </option>
  ));

  const handleSortAtoZ = () => dispatch({ type: "SORT_A_TO_Z" });

  const handleSortZtoA = () => dispatch({ type: "SORT_Z_TO_A" });

  const handleSortByPlatform = (e) =>
    dispatch({ type: "SORT_BY_PLATFORM", platform: e.target.value });

  return (
    <div>
      <button onClick={handleSortAtoZ}>Sort A to Z</button>
      <button onClick={handleSortZtoA}>Sort Z to A</button>
      <select defaultValue={"all-platforms"} onChange={handleSortByPlatform}>
        <option key="all-platforms" value="all-platforms">
          All Platforms
        </option>
        {platformListRender}
      </select>
      <style jsx>{`
        margin: 5%;
      `}</style>
    </div>
  );
};

export default FilterOptions;
