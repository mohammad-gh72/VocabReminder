import { useState } from "react";
import AddWordStyle from "../styles-modules/AddWord.module.css";

export default function AddWord({
  onAddingNewWord,
  onOpeningAdd,
  words,
  setStartingPage,
  setEndingPage,
}) {
  const [addWord, setAddWord] = useState(""); //for getting new word from user
  const [addMeaning, setAddMeaning] = useState(""); //for getting new meaning from user
  const [AddExplanation, setAddExplanation] = useState(""); //for getting new Explanation from user
  const [addExample, setAddExample] = useState(""); //for getting new Example from user

  //generating unique id
  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000); // Add randomness for extra uniqueness
    let newId = `${timestamp}-${random}`;
    //check if by any chance the generated id is already exist(returns true or false)
    const isIdExist = () => words.some((word) => word.id === newId);
    // if so (if it's already exist (true ?)) then we concat it with a new random
    //number at the end of it
    while (isIdExist()) {
      newId += Math.floor(Math.random() * 1000);
    }
    // finally we retun the unique generated id to use it
    return newId;
  }

  //checking if the word that user trys to add , already exist or no
  //it returnes a (true) or (false ) value so then we can use this resault
  //to conditionaly doing an action in addNewWord function
  function isWordAlreadyExist() {
    return words.some(
      (vocab) =>
        vocab.word.toLowerCase().trim() === addWord.toLowerCase().trim()
    );
  }
  //function for adding a new word into the vocab card's bank
  function addNewWord() {
    //as we said now we use isWordAlreadyExist that retuned a true or false
    //to doing some conditionaly actions
    //so here if it was true we do a guard clause (by returning immediately)
    if (isWordAlreadyExist()) return;

    //structuring our new word's object
    const newWord = {
      id: generateUniqueId(), //comes frome the function that we generated a unique id through it
      word: addWord, // frome addWord state
      meaning: addMeaning, // frome addMeaning state
      explanation: AddExplanation, // frome AddExplanation state
      example: addExample, // frome addExample state
      selected: false, //for controling the pinned and unpinned vocab cards
    };

    //this part will let the main action which is adding the new word to word list main state
    // to happening , by using the adding function that comes from App component
    //but we do a controling here first ,we say if user
    //put too much charachters (so we defind for each filed how much the limitation is, like <=40)
    // then the adding function should not comes into action otherwise it's good to go
    //and also in first two conditions we check user filed both word and meaning
    //because those are 2 forced to filed inputs
    if (
      //those checkings
      addWord &&
      addMeaning &&
      addWord.length <= 40 &&
      addMeaning.length <= 100 &&
      AddExplanation.length <= 500 &&
      addExample.length <= 500
    ) {
      //so if all was ok then this part will get execute
      //-----------------------------

      onAddingNewWord(newWord); // this is the main function comes from App to addin new object
      //to the main words state

      onOpeningAdd(); //it also comes from App as a handler function, to check when we press Add
      //button so it set (setIsAddOpen) into false to closing the add window
      //and let user back into main window (Cards window)
      setStartingPage(0); //initializing pagination start point (from index 0)
      setEndingPage(9); //initializing pagination end point (to index 9) (we only show 9 cards in eaach page)
    }
  }

  return (
    <div className={AddWordStyle.addContainer}>
      <div className={AddWordStyle.add__close__header}></div>

      <div className={AddWordStyle.add__form_bg}>
        <span
          role="button"
          title="close"
          className={AddWordStyle.add_close_btn}
          onClick={onOpeningAdd}
        >
          &times;
        </span>
        {/* we force users to not put the word or meaning fileds empty 
through a conditional rendering for showing a message (we only show the meesagae but 
in case of controlling we did it in the addNewWord function in last lines )  */}
        {!addWord || !addMeaning ? (
          <span
            style={{
              marginBottom: "1rem",
              textAlign: "center",
              color: "#d05d63",
              fontSize: "14px",
            }}
          >
            ensure both the &nbsp;
            <strong style={{ color: "#43a095" }}>Word</strong>&nbsp;and&nbsp;
            <strong style={{ color: "#43a095" }}>Meaning</strong>&nbsp; fields
            are filled
          </span>
        ) : (
          ""
        )}

        {/* here we only show check for showing or not showing a message in case of
        the word that user wrote was already exist ,(again the functionalty for
        preventing to add the repeated word , is on (top)of addNewWord funcrion) */}
        {isWordAlreadyExist() && (
          <p
            style={{ fontSize: "14px", textAlign: "center", color: "#6dae68" }}
          >
            this word is already in your vocabulary list
          </p>
        )}

        {/* to checking if user's input are more than limitation (in case of
        the length of characters) - we only use this part for showing messages
        we already did the functionalit in addNewWord function  */}
        {addWord.length > 40 ||
        addMeaning.length > 100 ||
        AddExplanation.length > 500 ||
        addExample.length > 500 ? (
          <p>Oops! 🙊 It looks like that is quite long.</p>
        ) : (
          ""
        )}

        {/* we do the controled element technique in react sates , for getting the values 
        from user and setting them , and passing them to addNewWord to making 
        an object out of it */}
        <input
          style={{ backgroundColor: isWordAlreadyExist() ? "#6dae68" : "" }}
          value={addWord}
          type="text"
          placeholder="* word... (Maximum 40 characters)"
          onChange={(e) => setAddWord(e.target.value)}
        />
        <textarea
          value={addMeaning}
          type="text"
          placeholder="* meaning... (Maximum 100 characters)"
          onChange={(e) => setAddMeaning(e.target.value)}
        />
        <textarea
          value={AddExplanation}
          type="text"
          placeholder="explanation... (Maximum 500 characters)"
          onChange={(e) => setAddExplanation(e.target.value)}
        />
        <textarea
          value={addExample}
          type="text"
          placeholder="example... (Maximum 500 characters)"
          onChange={(e) => setAddExample(e.target.value)}
        />
        <button
          className={AddWordStyle.add__btn}
          title="add"
          onClick={addNewWord}
          disabled={!addWord || addWord.trim() === "" ? true : false}
        >
          Add
        </button>
      </div>
    </div>
  );
}
