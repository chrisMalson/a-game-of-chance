import { useUser } from "../utils/auth/useUser";
import Header from "../components/Header";
import GameList from "../components/GameList";
import PickRandomGameButton from "../components/PickRandomGameButton";

const Index = () => {
  const { user } = useUser();

  return (
    <div>
      <Header />
      {user && (
        <>
          <PickRandomGameButton />
          <GameList />
        </>
      )}
    </div>
  );
};

export default Index;
