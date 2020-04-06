import GamesContext from "./GamesContext";
import { useContext } from "react";

const FilterOptions = () => {
  const { dispatch } = useContext(GamesContext);

  const handleSortAtoZ = () => dispatch({ type: "SORT_A_TO_Z" });

  const handleSortZtoA = () => dispatch({ type: "SORT_Z_TO_A" });

  return (
    <>
      <button onClick={handleSortAtoZ}>Sort A to Z</button>
      <button onClick={handleSortZtoA}>Sort Z to A</button>
      <style jsx>{`
        margin: 5%;
      `}</style>
    </>
  );
};

export default FilterOptions;
