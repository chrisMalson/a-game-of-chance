// separate component for clarity
// it may make more sense to have a separate actions file and import that,
// to eliminate the need for multiple useContext calls. Revisit?

import { useContext } from "react";
import { useRouter } from "next/router";
import MyContext from "./MyContext";

const AddGameButton = ({ game }) => {
  const router = useRouter();
  const { dispatch } = useContext(MyContext);
  const { name, id } = game;

  const onClick = () => {
    dispatch({ type: "ADD_GAME", name, id });
    router.push("/");
  };

  return <button onClick={onClick}>Add Game to List</button>;
};

export default AddGameButton;
