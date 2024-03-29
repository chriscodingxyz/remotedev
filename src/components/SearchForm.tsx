import { useSearchTextContext } from "../lib/hooks";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          handleChangeSearchText(e.target.value);
          // fetch(
          //   `https://bytegrad.com/course-assets/projects/rmtdev/api/data?q=${e.target.value}`
          // );
        }}
        spellCheck="false"
        type="text"
        value={searchText}
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}

//https://bytegrad.com/course-assets/projects/rmtdev/api/data
