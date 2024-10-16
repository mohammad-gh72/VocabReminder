function SearchWord({ searchInput, setSearchInput }) {
  return (
    <input
      value={searchInput}
      type="text"
      placeholder="Search for a word ..."
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}

export default SearchWord;
