import AuthIndex from "../components/AuthIndex";
import SearchForm from "../components/SearchForm";
import GameList from "../components/GameList";
import FilterOptions from "../components/FilterOptions";
import PickRandomGameButton from "../components/PickRandomGameButton";

const Index = () => {
  return (
    <div>
      <AuthIndex />
      <SearchForm />
      <PickRandomGameButton />
      <FilterOptions />
      <GameList />
    </div>
  );
};

export default Index;
