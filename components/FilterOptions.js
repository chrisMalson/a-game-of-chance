import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useContext, useEffect, useState } from "react";

import GamesContext from "../context/GamesContext";

const useStyles = makeStyles({
  arrowIcon: {
    marginBottom: "-0.5ex",
  },
  formControl: {
    width: "100%",
  },
  // optionsBar: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   flexWrap: "nowrap",
  //   marginBottom: "10px",
  // },
});

// filter options include the following:
// 1. sort games A to Z, and from Z to A
// 2. filters games by platform
//
// TODO: more filter options, refactor alphabetical into singular function, allow multiple selected platforms
// ... and maybe store timestamps? but I'm not sure that'll be particularly useful
const FilterOptions = () => {
  const { games, dispatch } = useContext(GamesContext);
  const [selectedPlatform, setSelectedPlatform] = useState("all-platforms");
  const { arrowIcon, formControl, optionsBar } = useStyles();

  const theme = useTheme();
  const gridDirection = theme.breakpoints.up("sm") ? "row" : "column";

  // saving the platform to local storage allows it to persist across page renders
  // this means the game list will generate based on the platform last selected
  useEffect(() => {
    if (localStorage.getItem("selectedPlatform") && games.length > 0) {
      const updatedPlatform = localStorage.getItem("selectedPlatform");
      setSelectedPlatform(updatedPlatform);
    }
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      dispatch({ type: "SORT_BY_PLATFORM", platform: selectedPlatform });
    }
  }, [selectedPlatform]);

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
  };

  return (
    <Grid
      container
      direction={gridDirection}
      spacing={1}
      className={optionsBar}
    >
      <Grid item xs={12} sm={7} md={8} lg={9}>
        <FormControl className={formControl}>
          <NativeSelect
            value={selectedPlatform}
            onChange={handleSortByPlatform}
          >
            <option key="all-platforms" value="all-platforms">
              All Platforms
            </option>
            {platformListRender}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={5} md={4} lg={3} align="right">
        <ButtonGroup fullWidth variant="contained" color="secondary">
          <Button onClick={handleSortAtoZ}>
            <Typography variant="body1">
              A {<ArrowRightAltIcon className={arrowIcon} fontSize="small" />} Z
            </Typography>
          </Button>
          <Button onClick={handleSortZtoA}>
            <Typography variant="body1">
              Z {<ArrowRightAltIcon className={arrowIcon} fontSize="small" />} A
            </Typography>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default FilterOptions;
