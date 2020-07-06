import { useUser } from "../utils/auth/useUser";
import AuthIndex from "../components/AuthIndex";
import SearchForm from "../components/SearchForm";
import GameList from "../components/GameList";
import FilterOptions from "../components/FilterOptions";
import PickRandomGameButton from "../components/PickRandomGameButton";

const Index = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <div>
      <AuthIndex />
      {user && (
        <>
          <SearchForm />
          <PickRandomGameButton />
          <FilterOptions />
          <GameList />
        </>
      )}
    </div>
  );
};

export default Index;
