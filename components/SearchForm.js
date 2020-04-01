import { useRouter } from "next/router";
import { useState } from "react";

const SearchForm = () => {
  const router = useRouter();

  // for text input value
  const [search, setSearch] = useState("");

  // updates component state with value from input field
  const onChange = e => {
    setSearch(e.target.value);
  };

  // redirects with state-saved e.target.value from input field
  const onSubmit = e => {
    e.preventDefault();
    router.push("/search/[value]", `/search/${search}`);
  };

  return (
    <>
      <div className="container">
        <h1>Search for a game...</h1>
        <form onSubmit={onSubmit}>
          <input type="text" onChange={onChange}></input>
          <button type="submit" value="submit">
            Submit
          </button>
        </form>
      </div>
      <style jsx>{`
        .container {
          justify-content: center;
          display: flex;
          flex-direction: column;
          margin: 25%;
        }
      `}</style>
    </>
  );
};

export default SearchForm;