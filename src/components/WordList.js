import Word from "./Word";
import wordListStyle from "../styles-modules/WordList.module.css";
import Slider from "./Slider";
import printIcon from "../icons/print_icon.png";
import Sorting from "./Sorting";
import gifticon from "../icons/gift-box.png";
import GiftWordsStyle from "../styles-modules/GiftWords.module.css";
import fiveHundredFourWords from "../fiveHundredFourWords/fiveHundredFourWords.js";
import clearAllIcon from "../icons/clear all.png";
import ClearAllStyle from "../styles-modules/ClearAll.module.css";
import SearchWord from "./SearchWord.js";
import SearchWordStyle from "../styles-modules/SearchWord.module.css";

const giftWords = fiveHundredFourWords.map((items) => items);
export default function WordList({
  onSelectedWord,
  onOpeningEdite,
  onRemove,
  handleSelectedCardWithCheckBox,
  addWordToSpecialListWithCheckBox,
  listOfWords,
  onOpeningAdd,
  setStartingPage,
  setEndingPage,
  startingPage,
  endingPage,
  onOpeningPrint,
  sortedArray,
  sorted,
  setSorted,
  setWords,
  setIsUsedGift,
  isUsedGift,
  words,
  setIsStartAddingGiftWords,
  handleClearAll,
  searchInput,
  setSearchInput,
}) {
  //to check when we are in last page and we do remove all cards
  //then it should not stay in that empty page any more
  //and it should come one page back atumaticly
  function checkLastPageAfterItemRemoval() {
    if (sortedArray.slice(startingPage, endingPage)?.length === 1) {
      const newLastPage = sortedArray?.length - 1;

      setEndingPage(newLastPage);
      if (newLastPage - 9 >= 0) setStartingPage(newLastPage - 9);
    }
  }

  return (
    <div className={wordListStyle.WordListContainer}>
      {/* we use slider component in here for pagination */}
      <Slider
        startingPage={startingPage}
        endingPage={endingPage}
        setStartingPage={setStartingPage}
        setEndingPage={setEndingPage}
        sortedArray={sortedArray}
      />

      {/* top bar(header) that hold (+ add word ) (print) and (sorting) */}
      <div className={wordListStyle.WordList__add__header}>
        {/*button for opening add word window */}
        <span
          role="button"
          className={wordListStyle.WordList__add__button}
          title="Add new word"
          onClick={onOpeningAdd} //opening the add word windows (props functionality
          //comews from App component)
        >
          +
        </span>
        {/* searching word */}
        {sorted === "normal" && (
          <div className={SearchWordStyle.parent}>
            <SearchWord
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
        )}
        {/* clear all flashcards at once  */}
        <div className={ClearAllStyle.clearParent}>
          <img
            title="clear all"
            className={ClearAllStyle.clearImg}
            src={clearAllIcon}
            alt="clear all flash cards"
            srcset=""
            onClick={handleClearAll}
          />
        </div>
        {/* adding gift words part */}
        {isUsedGift && (
          <div className={GiftWordsStyle.giftParent}>
            <div className={GiftWordsStyle.bgGift}>
              <img
                title="gift"
                className={GiftWordsStyle.giftIcon}
                src={gifticon}
                alt="gift words"
                onClick={() => {
                  setIsStartAddingGiftWords(true);
                  setWords((prev) => [...prev, ...giftWords]);
                  setIsUsedGift(false);

                  chrome.storage.local
                    .set({ theWordList: [...giftWords, ...words] })
                    .then(() => {
                      setIsStartAddingGiftWords(false);
                    });
                }}
              />
              <p className={GiftWordsStyle.ptagGift}>
                504 (english) flash cards will be added to your desk.
              </p>
            </div>
          </div>
        )}
        {/* opening print window */}
        <img
          role="button"
          className={wordListStyle.printIcon}
          src={printIcon}
          alt="print"
          title="print"
          onClick={onOpeningPrint} //opening the print windows (props functionality
          //comews from App component)
        />
        {/* sorting component */}
        <div className={wordListStyle.sorting}>
          <Sorting sorted={sorted} setSorted={setSorted} />
        </div>
      </div>

      <ul className={wordListStyle.WordList__ul}>
        {/* if words array is empty (if there is no word (basicly if words state 
        in App is empty)) show a message otherwise 
        do the rest */}

        {searchInput && sortedArray.length === 0 && sorted === "normal" ? (
          <div className={wordListStyle.emptywordlistcontainer}>
            <p className={wordListStyle.emptywordlistmessage}>
              No matching flashcards found.
            </p>
          </div>
        ) : listOfWords.length === 0 ? (
          <div className={wordListStyle.emptywordlistcontainer}>
            <p className={wordListStyle.emptywordlistmessage}>
              To begin, add your first word by clicking the add button (+)
              located in the top right corner.
            </p>
          </div>
        ) : //if there is no pinned flash card also show a message
        sortedArray.length === 0 ? (
          <div className={wordListStyle.emptywordlistcontainer}>
            <p className={wordListStyle.emptywordlistmessage}>
              No pinned flashcards found. Switch back to "All" mode and mark
              some as pinned.
            </p>
          </div>
        ) : (
          //rendering the cards out of words state in App component
          //by using the structure we made in Word.js component
          //nothice we used slice array methoud for pagination and i
          // explaiend it in Slider component
          //(the notice part)
          sortedArray
            .slice(startingPage, endingPage)
            .map((word) => (
              <Word
                onCheckLastPageAfterItemRemoval={checkLastPageAfterItemRemoval}
                key={word.id}
                options={word}
                onSelectedWord={onSelectedWord}
                onOpeningEdite={onOpeningEdite}
                onRemove={onRemove}
                handleSelectedCardWithCheckBox={handleSelectedCardWithCheckBox}
                addWordToSpecialListWithCheckBox={
                  addWordToSpecialListWithCheckBox
                }
              />
            ))
        )}
      </ul>
    </div>
  );
}
