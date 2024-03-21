type SearchFormProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export default function SearchForm({
  searchText,
  setSearchText,
}: SearchFormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          console.log(e.target.value);
          setSearchText(e.target.value);
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
