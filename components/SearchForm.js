import { useState } from "react";
import { useRouter } from "next/router";
import { FormControl, Button, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "55px",
  },
  input: {
    maxWidth: "500px",
    width: "100%",
    color: theme.palette.primary.contrastText,
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
  const { form, formControl, input, button } = useStyles();

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
      <FormControl className={formControl} required>
        <FilledInput
          required
          variant="filled"
          type="text"
          placeholder="Search for a game..."
          onChange={onChange}
          className={input}
        ></FilledInput>
        <Button
          className={button}
          variant="contained"
          type="submit"
          value="submit"
        >
          <SearchIcon />
        </Button>
      </FormControl>
    </form>
  );
};

export default SearchForm;
