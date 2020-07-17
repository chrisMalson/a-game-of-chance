import { Button, Grid, NativeSelect } from "@material-ui/core";
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

// when game is already on list, functions similarly to the AddGameButton component
// with same selectable platform logic
const ChangePlatformButton = ({ game, currentPlatform }) => {
  const router = useRouter();
  const { dispatch } = useContext(GamesContext);
  const { name, id, background_image } = game;
  const { button, select } = useStyles();

  const [newPlatform, setNewPlatform] = useState(currentPlatform);

  const availablePlatforms = game.platforms.map((i) => (
    <option key={i.platform.name} value={i.platform.name}>
      {i.platform.name}
    </option>
  ));

  const handleChangePlatform = () => {
    dispatch({
      type: "CHANGE_PLATFORM",
      name,
      id,
      background_image,
      platform: newPlatform,
    });
    router.push("/");
  };

  const handleChoosePlatform = (e) => setNewPlatform(e.target.value);

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12}>
        <NativeSelect
          className={select}
          variant="outlined"
          defaultValue={currentPlatform}
          onChange={handleChoosePlatform}
        >
          {availablePlatforms}
        </NativeSelect>
      </Grid>
      <Grid item xs={6}>
        <Button
          className={button}
          variant="contained"
          color="primary"
          onClick={handleChangePlatform}
        >
          Change Platform
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChangePlatformButton;
