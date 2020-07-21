import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    height: "55px",
  },
  formControl: {
    width: "80%",
  },
  inputLabel: {
    color: theme.palette.primary.contrastText,
    paddingLeft: "1rem",
  },
  input: {
    width: "100%",
    color: theme.palette.common.white,
    fontSize: "1.5rem",
  },
  button: {
    width: "50px",
    height: "100%",
    borderRadius: "0 4px 4px 0",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
}));

// TODO: better search filtering; right now any text will be submitted without vetting first
const SearchForm = () => {
  const router = useRouter();
  const { button, form, formControl, input, inputLabel } = useStyles();

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
    <form className={form} onSubmit={handleSearchSubmit}>
      <FormControl className={formControl}>
        <InputLabel
          color="secondary"
          className={inputLabel}
          htmlFor="search-input"
        >
          Search for a game...
        </InputLabel>
        <FilledInput
          required
          id="search-input"
          variant="filled"
          type="text"
          onChange={onChange}
          className={input}
          margin="dense"
        ></FilledInput>
      </FormControl>
      <Button
        className={button}
        variant="contained"
        type="submit"
        value="submit"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};

export default SearchForm;
