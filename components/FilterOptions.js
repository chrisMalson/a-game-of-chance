import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useContext, useEffect, useState } from "react";

import GamesContext from "../context/GamesContext";

const useStyles = makeStyles({
  optionsBar: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  select: {
    width: "100%",
  },
  buttons: {
    width: "auto",
  },
});

// filter options include the following:
// 1. sort games A to Z, and from Z to A
// 2. filters games by platform
//
// TODO: more filter options, refactor alphabetical into singular function, allow multiple selected platforms
// ... and maybe store timestamps? but I'm not sure that'll be particularly useful
const FilterOptions = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("all-platforms");
  const { optionsBar, select, buttons } = useStyles();

  // saving the platform to local storage allows it to persist across page renders
  // this means the game list will generate based on the platform last selected
  useEffect(() => {
    if (localStorage.getItem("selectedPlatform")) {
      setSelectedPlatform(localStorage.getItem("selectedPlatform"));
    }
  }, []);

  const { games, dispatch } = useContext(GamesContext);

  // TODO: figure out why I needed to use a Set here
  const platformList = [...new Set(games.map(({ platform }) => platform))];

  const platformListRender = platformList.map((platform) => (
    <option key={platform} value={platform}>
      {platform}
    </option>
  ));

  const handleSortAtoZ = () => dispatch({ type: "SORT_A_TO_Z" });

  const handleSortZtoA = () => dispatch({ type: "SORT_Z_TO_A" });

  const handleSortByPlatform = (e) => {
    const newPlatform = e.target.value;

    localStorage.setItem("selectedPlatform", newPlatform);
    setSelectedPlatform(newPlatform);
    console.log(selectedPlatform);
    dispatch({ type: "SORT_BY_PLATFORM", platform: newPlatform });
  };

  return (
    <Grid container className={optionsBar}>
      <Grid item xs={6}>
        <FormControl className={select}>
          <Select value={selectedPlatform} onChange={handleSortByPlatform}>
            <option key="all-platforms" value="all-platforms">
              All Platforms
            </option>
            {platformListRender}
          </Select>
        </FormControl>
      </Grid>
      <Grid item className={buttons}>
        <ButtonGroup variant="contained" color="secondary">
          <Button onClick={handleSortAtoZ}>
            <Typography variant="body1">
              A {<ArrowRightAltIcon fontSize="small" />} Z
            </Typography>
          </Button>
          <Button onClick={handleSortZtoA}>
            <Typography variant="body1">
              Z {<ArrowRightAltIcon fontSize="small" />} A
            </Typography>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default FilterOptions;
