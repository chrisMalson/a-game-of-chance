import SearchForm from "../components/SearchForm";
import GameList from "../components/GameList";
import FilterOptions from "../components/FilterOptions";
import PickRandomGameButton from "../components/PickRandomGameButton";

const Index = () => (
  <>
    <SearchForm />
    <PickRandomGameButton />
    <FilterOptions />
    <GameList />
  </>
);

export default Index;
