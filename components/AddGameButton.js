import { Button, Grid, NativeSelect, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import GamesContext from "../context/GamesContext";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
  select: {
    width: "100%",
  },
});

// renders a button that adds game to list with selectable platform
// lists only available platforms from data fetched via API call
const AddGameButton = ({ game }) => {
  const router = useRouter();
  const { dispatch } = useContext(GamesContext);
  const { button, select } = useStyles();

  // these properties are not rendered but are saved to the database when the game is added
  const { name, id, background_image } = game;

  // for a controlled select dropdown where the only options are the platforms the game is available on
  const [platform, setPlatform] = useState(game.platforms[0].platform.name);
  const availablePlatforms = game.platforms.map((i) => (
    <option key={i.platform.name} value={i.platform.name}>
      {i.platform.name}
    </option>
  ));
  const handleChoosePlatform = (e) => setPlatform(e.target.value);

  // remember that thing I said on line 21?
  const handleAddGame = () => {
    dispatch({ type: "ADD_GAME", name, id, platform, background_image });
    router.push("/");
  };

  // if only one available platform, only text will show rather than select element

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} sm={9}>
        {availablePlatforms.length > 1 ? (
          <NativeSelect
            className={select}
            variant="outlined"
            onChange={handleChoosePlatform}
          >
            {availablePlatforms}
          </NativeSelect>
        ) : (
          <Typography className={select}>{platform}</Typography>
        )}
      </Grid>
      <Grid item xs={6} sm={3}>
        <Button
          className={button}
          variant="contained"
          color="primary"
          onClick={handleAddGame}
        >
          Add Game
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddGameButton;
