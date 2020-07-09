import { useContext } from "react";
import {
  Button,
  ButtonGroup,
  Typography,
  Grid,
  Select,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import GamesContext from "../context/GamesContext";

// filter options include the following:
// 1. sort games A to Z, and from Z to A
// 2. filters games by platform
//
// TODO: more filter options, refactor alphabetical into singular function, allow multiple selected platforms
// ... and maybe store timestamps? but I'm not sure that'll be particularly useful
const FilterOptions = () => {
  const { games, dispatch } = useContext(GamesContext);

  const platformList = [...new Set(games.map(({ platform }) => platform))];

  const platformListRender = platformList.map((platform) => (
    <option key={platform} value={platform}>
      {platform}
    </option>
  ));

  const handleSortAtoZ = () => dispatch({ type: "SORT_A_TO_Z" });

  const handleSortZtoA = () => dispatch({ type: "SORT_Z_TO_A" });

  const handleSortByPlatform = (e) =>
    dispatch({ type: "SORT_BY_PLATFORM", platform: e.target.value });

  return (
    <Grid container justify="space-between">
      <Grid item xs={8}>
        <Select defaultValue={"all-platforms"} onChange={handleSortByPlatform}>
          <option key="all-platforms" value="all-platforms">
            All Platforms
          </option>
          {platformListRender}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <ButtonGroup variant="contained" color="primary">
          <Button onClick={handleSortAtoZ}>
            <Typography variant="h6">A {<ArrowRightAltIcon />} Z</Typography>
          </Button>
          <Button onClick={handleSortZtoA}>
            <Typography variant="h6">Z {<ArrowRightAltIcon />} A</Typography>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default FilterOptions;
