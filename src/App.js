import { useState, useEffect } from "react";
import Edit from "./components/Edit";
import WordList from "./components/WordList";
import style from "./styles-modules/App.module.css";
import AddWord from "./components/AddWord";
import WordDetailsModal from "./components/WordDetailsModal";
import PdfRender from "./components/PdfRender";
import CardsPanelParent from "./components/CardsPanelParent";
import GiftedWords from "./components/WaitingPage";
import WaitingPage from "./components/WaitingPage";
import { func } from "prop-types";
// import Advertisement from "./components/Advertisement";
// export const vocabsList = [];

function App() {
  const [words, setWords] = useState([]); //the main word array that we will
  //do all add - edite - remove and retrive on it.
  const [currentSelectedWord, setCurrentSelectedWord] = useState(null); //the current
  //word that we alwayse set it = our target card so then we can immplument
  //our (CRUD=create-remove-update) operations base on it,
  //because we alwayse in array methouds like map or filter should
  //check if the item we want to change in main word array (words state) is
  // equle to curentselectedword (our target card) or no
  const [isStartAddingGiftWords, setIsStartAddingGiftWords] = useState(false);
  const [isUsedGift, setIsUsedGift] = useState(true);
  const [isEditeOpen, setIsEditeOpen] = useState(false); //controling the closing
  //and opening of edite window
  const [isAddOpen, setIsAddOpen] = useState(false); //controling the closing
  //and opening of addwords window
  const [isModalOpen, setIsModalOpen] = useState(false); //controling the closing
  //and opening of model window
  const [isPrintOpen, setIsPrintOpen] = useState(false); //controling the closing
  //and opening of printing window
  const [startingPage, setStartingPage] = useState(0); //we use it in pagination
  //more info in Slider component
  const [endingPage, setEndingPage] = useState(9); //we use it in pagination
  //more info in Slider component
  const [sorted, setSorted] = useState("normal"); //we use it for sorting the orders of Cards
  // more info in Sorting component

  const [sortedArray, setSortedArray] = useState(null); // we pass this (sortedArray) to
  //WordList component so we render the sorted version of array (like if user
  // chooice pinned in selection box we render in a way that pinned cards will be
  //in first place in the list and if he select 'normal' we render it as casual(the order
  //of the main words state))
  //----------------------------------------------

  useEffect(() => {
    chrome.storage.local.get("giftUsed", (res) => {
      setIsUsedGift(res.giftUsed);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ giftUsed: isUsedGift }).then(() => {
      // console.log("gift value is set");
    });
  }, [isUsedGift]);

  //initilizing the sorted option user choosed
  //every time app runs , so it saves users chooses
  //and retrive them here (save happening in next useeffect)
  useEffect(() => {
    chrome.storage.local.get("sortingPinnedCards", (res) => {
      setSorted(res.sortingPinnedCards || "normal");
    });
  }, []);

  //Handling  sortin base on sort component selection (<option> normal and checked)

  useEffect(() => {
    //here saveing of users selecting happening for sorting options
    //in list box (saves into chrom storage- we retrive in previous useeffect)
    chrome.storage.local.set({ sortingPinnedCards: sorted }).then(() => {
      // console.log("sort value is set");
      // console.log(sorted);
    });

    //if user choosed normal (that is value is 'normal' in select list)
    //and words state is not empty we do this
    if (words && sorted === "normal") {
      setSortedArray(words);
    }
    //if user choosed pinned (that is value is 'pinned' in select list)
    //and words state is not empty we do this
    if (words && sorted === "pinned") {
      //changing true and false to numbers makes them to be
      //true =1 and false =0 , so then we can do sort array methoud on it
      //in normal way in assending ordessending order
      setSortedArray(words.slice().filter((word) => word.selected === true));
    }
  }, [words, sorted]); // in [words, sorted] we track both words and sorted cahnges
  //so useEffect know when it should re-REnder (words because if user adds new word so now the
  //sortedArray state should get updated to the new value) and (sorted for chking the new order
  // of cards in view base on users choose)

  //-------------------------

  //initialize the pagination (start and ending page ) to
  //their initial values if we user toggled between sorting list
  useEffect(() => {
    setStartingPage(0);
    setEndingPage(9);
  }, [sorted]);

  // retriving all saved flashcards from chromes storage
  useEffect(() => {
    chrome.storage.local.get(["theWordList"], (result) => {
      if (result.theWordList) {
        // If there is data in storage, set it to the state
        setWords(result.theWordList);
      } else {
        console.log("No data found in storage.");
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once and not more
  //, after the initial render

  //--------------------------
  //functionality for adding new word
  function handleAddWord(newWord) {
    setWords((words) => [newWord, ...words]);

    chrome.storage.local.set({ theWordList: [newWord, ...words] }).then(() => {
      // console.log("Value is set");
    });
  }

  //functionality for editing a card
  function handleEdit(newUpdate) {
    setWords((words) =>
      words.map((w) =>
        w?.id === currentSelectedWord?.id ? { ...w, ...newUpdate } : w
      )
    );

    chrome.storage.local
      .set({
        theWordList: words.map((w) =>
          w?.id === currentSelectedWord?.id ? { ...w, ...newUpdate } : w
        ),
      })
      .then(() => {
        // console.log("Value gets updated");
      });
  }

  //functionality for removing a card
  function handleRemoveWord(curentIdYouWantToRemove) {
    setWords((words) =>
      words.filter((word) => word?.id !== curentIdYouWantToRemove)
    );

    chrome.storage.local
      .set({
        theWordList: words.filter(
          (word) => word?.id !== curentIdYouWantToRemove
        ),
      })
      .then(() => {
        // console.log("Value has been deleted");
      });
  }

  //functionality for pinning or unpinnig a card
  //by changing it (selected) atrribute (so if it alreay was false
  //it will become true if we click on pinn check box and if it was already true
  //it will become false)
  function handleSelectedWord() {
    setWords((prevWord) =>
      prevWord.map((item) =>
        item.id === currentSelectedWord.id
          ? { ...item, selected: !item.selected }
          : item
      )
    );

    chrome.storage.local
      .set({
        theWordList: words.map((item) =>
          item.id === currentSelectedWord.id
            ? { ...item, selected: !item.selected }
            : item
        ),
      })
      .then(() => {
        // console.log("Selected Value gets updated");
      });
  }

  function handleClearAll() {
    setWords([]);

    chrome.storage.local.set({ theWordList: [] }).then(() => {
      // console.log("Value is set");
    });
    setIsUsedGift(true);
  }
  //----------------------------
  //this part holds functions that gonna control
  //the isopening states for each tool in our application
  //that will open a new windows for us
  //and also some of them will do two things
  //and also will set the (currentSelectedWord) state
  //to our target clicked card
  //we gonna pass them as props to coresponding components
  function setCurrentSelectedCard(options) {
    setCurrentSelectedWord(options);
    handleIsModalOpen();
  }

  function handleisEditeOpen(options) {
    setCurrentSelectedWord(options);
    setIsEditeOpen((isopen) => !isopen);
  }
  function handleisAddOpen() {
    setIsAddOpen((isopen) => !isopen);
  }

  function handleIsModalOpen() {
    setIsModalOpen((isopen) => !isopen);
  }
  function handleIsPrintOpen() {
    setIsPrintOpen((isopen) => !isopen);
  }

  function handleSelectedCardWithCheckBox(options) {
    setCurrentSelectedWord(options);
  }
  return (
    <div className={style.app}>
      {/* conditionaly rendering the main page of application
      so if print or edit or add or modal isopening states gets
      true we not gonna render the main page anymore and instead we gonna
      render those windowses (we do have condition for them too so if isopenenig 
      states of them was true then we render them and we not render this main window) */}
      {isPrintOpen || isEditeOpen || isAddOpen || isModalOpen || (
        <CardsPanelParent>
          {/* wordList component */}
          <div
            style={{
              margin: "0",
              padding: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <WordList
              onOpeningAdd={handleisAddOpen}
              listOfWords={words}
              setStartingPage={setStartingPage}
              setEndingPage={setEndingPage}
              startingPage={startingPage}
              endingPage={endingPage}
              sorted={sorted}
              setSorted={setSorted}
              onSelectedWord={setCurrentSelectedCard}
              onOpeningEdite={handleisEditeOpen}
              onOpeningPrint={handleIsPrintOpen}
              onRemove={handleRemoveWord}
              handleSelectedCardWithCheckBox={handleSelectedCardWithCheckBox}
              addWordToSpecialListWithCheckBox={handleSelectedWord}
              sortedArray={sortedArray}
              setWords={setWords}
              setIsUsedGift={setIsUsedGift}
              isUsedGift={isUsedGift}
              words={words}
              setIsStartAddingGiftWords={setIsStartAddingGiftWords}
              handleClearAll={handleClearAll}
            />
          </div>
        </CardsPanelParent>
      )}
      {/* as i said before in conditional rendering of main page of our applicatio
      if the isopenenig states of any other window like edit window or add
      window or modal window or print window was (true) then we render them and
      we not render the main window and we make them false again when we click
      on their close buttons on their pages because we also passed the isopening 
      states of each one as props to those components */}
      {isEditeOpen && (
        <Edit
          onEdite={handleEdit}
          currentSelectedWord={currentSelectedWord}
          onOpeningEdite={handleisEditeOpen}
        />
      )}
      {isAddOpen && (
        <AddWord
          onOpeningAdd={handleisAddOpen}
          onAddingNewWord={handleAddWord}
          words={words}
          setStartingPage={setStartingPage}
          setEndingPage={setEndingPage}
        />
      )}
      {isModalOpen && (
        <WordDetailsModal
          onCard={currentSelectedWord}
          onOpen={handleIsModalOpen}
        />
      )}
      {isPrintOpen && (
        <PdfRender
          onOpeningPrint={handleIsPrintOpen}
          sortedArray={sortedArray}
          sorted={sorted}
        />
      )}
      {isStartAddingGiftWords && <WaitingPage />}
      {/* advertizment part for when i want to add it back to the ui */}
      {/* {isPrintOpen || <Advertisement />} */}
    </div>
  );
}

export default App;
