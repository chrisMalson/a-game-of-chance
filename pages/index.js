import { useUser } from "../utils/auth/useUser";
import { Grid, Box } from "@material-ui/core";
import Header from "../components/Header";
import GameList from "../components/GameList";
import PickRandomGameButton from "../components/PickRandomGameButton";

const Index = () => {
  const { user } = useUser();

  return (
    <Box>
      <Header />
      {user && (
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Box />
          </Grid>
          <Grid item>
            <PickRandomGameButton />
          </Grid>
          <Grid item>
            <GameList />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Index;
