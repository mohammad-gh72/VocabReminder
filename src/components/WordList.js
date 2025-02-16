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
import { useEffect, useRef, useState } from "react";
import PageNumberShow from "./PageNumberShow.js";
import { func } from "prop-types";
import clearallgiftflashcards from "../icons/./clearallgiftflashcards.png";

const giftWords = [...fiveHundredFourWords];
export default function WordList({
  handleSavePageNumber,
  handleSavePageNumberForPinCards,
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
  pinSectionStartingPage,
  pinSectionEndinggPage,
  setPinSectionStartingPage,
  setPinSectionEndinggPage,
}) {
  const [isGiftClosed, setIfGiftClosed] = useState(false);
  const giftCloseDivRef = useRef();
  const giftCloseBtnRef = useRef();
  let newWordList = [];
  function clearAllGifts() {
    setSearchInput("");

    handleSavePageNumber(0, 9);
    handleSavePageNumberForPinCards(0, 9);
    newWordList = listOfWords?.filter((cart) => !("type" in cart));
    setWords(newWordList);

    setIsUsedGift(true);
    chrome.storage.local.set({ theWordList: newWordList }).then(() => {
      // console.log("Value is set");
    });

    chrome.storage.local.get(
      ["startingPageNumber", "endingPageNumber"],
      (result) => {
        if (result.startingPageNumber !== undefined) {
          setStartingPage(Number(result.startingPageNumber));
          console.log(result.startingPageNumber);
        }
        if (result.endingPageNumber !== undefined) {
          setEndingPage(Number(result.endingPageNumber));
          console.log(result.endingPageNumber);
        }
      }
    );

    if (listOfWords.length === 0) {
      chrome.storage.local
        .set({ startingPage: 0, endingPage: 9, currentPageNumber: 1 })
        .then(() => {
          // console.log("Values are set");
        });

      setStartingPage(0);
      setEndingPage(9);
    }
    window.location.reload();
  }

  // useEffect(() => {
  //   handleSavePageNumber(0, 9);
  //   handleSavePageNumberForPinCards(0, 9);
  // }, giftWords.length);

  function handleGiftClose() {
    // giftCloseDivRef.current.classList.remove(GiftWordsStyle.showGiftPanel);
    // giftCloseDivRef.current.classList.add(GiftWordsStyle.closeGiftPanel);

    setIfGiftClosed(true);
    chrome.storage.local.set({ giftToggle: true }).then(() => {
      // console.log("Value is set");
    });
  }
  function handleGiftOpen() {
    // giftCloseDivRef.current.classList.add(GiftWordsStyle.showGiftPanel);
    // giftCloseDivRef.current.classList.remove(GiftWordsStyle.closeGiftPanel);
    setIfGiftClosed(false);

    chrome.storage.local.set({ giftToggle: false }).then(() => {
      // console.log("Value is set");
    });
  }

  useEffect(() => {
    chrome.storage.local.get("giftToggle", (res) => {
      if (res.giftToggle !== undefined) {
        setIfGiftClosed(res.giftToggle);
      }
    });
  }, []);

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
  function checkLastPageAfterItemRemovalForPinnedPanel() {
    if (
      sortedArray.slice(pinSectionStartingPage, pinSectionEndinggPage)
        ?.length === 1
    ) {
      const newLastPage = sortedArray?.length - 1;

      setPinSectionEndinggPage(newLastPage);
      if (newLastPage - 9 >= 0) setPinSectionStartingPage(newLastPage - 9);
    }
  }

  return (
    <div className={wordListStyle.WordListContainer}>
      {/* we use slider component in here for pagination */}
      {/* <Slider
        startingPage={startingPage}
        endingPage={endingPage}
        setStartingPage={setStartingPage}
        setEndingPage={setEndingPage}
        sortedArray={sortedArray}
      /> */}

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
        {/* clear only gift flashcards */}
        {!isUsedGift && (
          <div className={ClearAllStyle.clearAllGiftsParent}>
            <img
              title="Clear all gift flashcards only"
              src={clearallgiftflashcards}
              alt="Clear all gift flashcards only"
              onClick={() => {
                clearAllGifts();
              }}
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
            {isGiftClosed ? (
              <button
                title="open the gift panel"
                onClick={handleGiftOpen}
                className={GiftWordsStyle.openBtn}
              >
                &#10150;
              </button>
            ) : (
              <button
                title="close the gift panel"
                className={GiftWordsStyle.close}
                onClick={handleGiftClose}
                ref={giftCloseBtnRef}
              >
                &#x2715;
              </button>
            )}

            {isGiftClosed || (
              <div className={GiftWordsStyle.bgGift} ref={giftCloseDivRef}>
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
            )}
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

      {/* showing the normal version of table of flashcards */}

      {sorted === "normal" && (
        <>
          {sortedArray?.length > 0 && (
            <PageNumberShow
              wholePage={Math.ceil(sortedArray?.length / 9) || 0}
              currentPage={
                sortedArray?.length === 0
                  ? 0
                  : startingPage === 0
                  ? 1
                  : startingPage / 9 + 1
              }
              isOnSearch={searchInput ? true : false}
              setStartPage={setStartingPage}
              setEndPage={setEndingPage}
              handleSavePageNumber={handleSavePageNumber}
            />
          )}
          <Slider
            startingPage={startingPage}
            endingPage={endingPage}
            setStartingPage={setStartingPage}
            setEndingPage={setEndingPage}
            sortedArray={sortedArray}
            handleSavePageNumber={handleSavePageNumber}
          />
          {/* searching word */}
          <div className={SearchWordStyle.parent}>
            <SearchWord
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setStartingPage={setStartingPage}
              setEndingPage={setEndingPage}
            />
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
                    onCheckLastPageAfterItemRemoval={
                      checkLastPageAfterItemRemoval
                    }
                    key={word.id}
                    options={word}
                    onSelectedWord={onSelectedWord}
                    onOpeningEdite={onOpeningEdite}
                    onRemove={onRemove}
                    handleSelectedCardWithCheckBox={
                      handleSelectedCardWithCheckBox
                    }
                    addWordToSpecialListWithCheckBox={
                      addWordToSpecialListWithCheckBox
                    }
                  />
                ))
            )}
          </ul>
        </>
      )}

      {/* showing the pinned version of table of flashcards */}

      {sorted === "pinned" && (
        <>
          {sortedArray?.length > 0 && (
            <PageNumberShow
              wholePage={Math.ceil(sortedArray?.length / 9) || 0}
              currentPage={
                sortedArray?.length === 0
                  ? 0
                  : pinSectionStartingPage === 0
                  ? 1
                  : pinSectionStartingPage / 9 + 1
              }
              isOnSearch={searchInput ? true : false}
              ispinnedSort={true}
              setStartPage={setPinSectionStartingPage}
              setEndPage={setPinSectionEndinggPage}
              handleSavePageNumber={handleSavePageNumberForPinCards}
            />
          )}
          <Slider
            startingPage={pinSectionStartingPage}
            endingPage={pinSectionEndinggPage}
            setStartingPage={setPinSectionStartingPage}
            setEndingPage={setPinSectionEndinggPage}
            sortedArray={sortedArray}
            bgColor="#292827"
            fontColor="white"
            handleSavePageNumber={handleSavePageNumberForPinCards}
          />
          <ul
            className={wordListStyle.WordList__ul}
            style={{ backgroundColor: "#fff2d6" }}
          >
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
                .slice(pinSectionStartingPage, pinSectionEndinggPage)
                .map((word) => (
                  <Word
                    checkLastPageAfterItemRemovalForPinnedPanel={
                      checkLastPageAfterItemRemovalForPinnedPanel
                    }
                    onCheckLastPageAfterItemRemoval={
                      checkLastPageAfterItemRemoval
                    }
                    key={word.id}
                    options={word}
                    onSelectedWord={onSelectedWord}
                    onOpeningEdite={onOpeningEdite}
                    onRemove={onRemove}
                    handleSelectedCardWithCheckBox={
                      handleSelectedCardWithCheckBox
                    }
                    addWordToSpecialListWithCheckBox={
                      addWordToSpecialListWithCheckBox
                    }
                  />
                ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}
