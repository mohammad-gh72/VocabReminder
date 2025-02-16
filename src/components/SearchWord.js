import { useEffect } from "react";

function SearchWord({
  searchInput,
  setSearchInput,
  setStartingPage,
  setEndingPage,
}) {
  const searchInputEmpty = searchInput === "";
  function ifInputGetsEmptyBackToLastSavedPagedNumber() {
    if (!searchInput) {
      chrome.storage.local.get(
        ["startingPageNumber", "endingPageNumber"],
        (result) => {
          if (result.startingPageNumber !== undefined) {
            setStartingPage(Number(result.startingPageNumber));
          }
          if (result.endingPageNumber !== undefined) {
            setEndingPage(Number(result.endingPageNumber));
          }
        }
      );
    }
  }

  function backStartingPageAndEndingPageToDefaultSoItCanSearchAmoungAllFlashCards() {
    setStartingPage(0);
    setEndingPage(9);
  }

  useEffect(() => {
    ifInputGetsEmptyBackToLastSavedPagedNumber();
  }, [searchInputEmpty]);

  return (
    <input
      value={searchInput}
      type="text"
      placeholder="Search for a word ..."
      onChange={(e) => {
        setSearchInput(e.target.value);
        backStartingPageAndEndingPageToDefaultSoItCanSearchAmoungAllFlashCards();
      }}
    />
  );
}

export default SearchWord;
