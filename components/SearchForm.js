import { useState } from "react";
import { useRouter } from "next/router";

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
    <>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            onChange={onChange}
            placeholder="Search for a game..."
          ></input>
          <button type="submit" value="submit">
            SEARCH
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
