import { useState } from "react";
import { useRouter } from "next/router";
import {
  FormControl,
  FormHelperText,
  Button,
  FilledInput,
  Typography,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// TODO: better search filtering; right now any text will be submitted without vetting first
const SearchForm = () => {
  const router = useRouter();

  // for text input value
  const [search, setSearch] = useState("");

  // updates component state with value from input field
  const onChange = (e) => setSearch(e.target.value);

  // redirects with state-saved e.target.value from input field
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push("/search/[value]", `/search/${search}`);
  };

  return (
    <Grid container>
      <form onSubmit={handleSearchSubmit}>
        <FormControl required>
          <Grid item>
            <FormHelperText>
              <Typography color="textSecondary">
                Search for a game...
              </Typography>
            </FormHelperText>
            <FilledInput
              required
              variant="filled"
              type="text"
              onChange={onChange}
            ></FilledInput>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" value="submit">
              <SearchIcon />
            </Button>
          </Grid>
        </FormControl>
      </form>
    </Grid>
  );
};

export default SearchForm;
