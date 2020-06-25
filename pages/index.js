import SearchForm from "../components/SearchForm";
import GameList from "../components/GameList";
import FilterOptions from "../components/FilterOptions";
import PickRandomGameButton from "../components/PickRandomGameButton";
import GamesReducer from "../utils/pageWrappers/GamesReducer";

const Index = () => {
  return (
    <div>
      <GamesReducer>
        <SearchForm />
        <PickRandomGameButton />
        <FilterOptions />
        <GameList />
      </GamesReducer>
    </div>
  );
};

export default Index;
