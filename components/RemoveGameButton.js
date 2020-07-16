import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";

import GamesContext from "../context/GamesContext";

// removes the game when you click the button
const RemoveGameButton = ({ game }) => {
  const router = useRouter();
  const { dispatch } = useContext(GamesContext);
  const { id } = game;
  const [open, setOpen] = useState(false);

  const handleRemoveGame = () => {
    dispatch({ type: "REMOVE_GAME", id });

    router.push("/");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Remove Game</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={() => setOpen(false)}>
            Keep Game
          </Button>
          <Button variant="outlined" onClick={handleRemoveGame}>
            Remove Game
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RemoveGameButton;
