import { useState } from "react";
import { useEffect } from "react";
import EditeStyle from "../styles-modules/Edite.module.css";

export default function Edit({ onEdite, currentSelectedWord, onOpeningEdite }) {
  const [editedWord, setEditeWord] = useState(""); //for getting the changes (on word) from user
  const [editedMeaning, setEditedMeaning] = useState(""); //for getting the changes (on Meaning) from user
  const [editedExplanation, setEditedExplanation] = useState(""); //for getting the changes (on Explanation) from user
  const [editedExample, setEditedExample] = useState(""); //for getting the changes (on Example) from user

  //editing function that make's a new object out of
  //users new inputs for passing it into the onEdit functions
  //that comes from App component and holds the main functionality
  //for editing the target vocab card
  function editingContent() {
    //making new object out of users new inputs on target cart that wants to
    //become updated with new values
    const newUpdate = {
      word: editedWord,
      meaning: editedMeaning,
      explanation: editedExplanation,
      example: editedExample,
    };

    //this part will let the main action which is editing the target vocab card
    // to happening , by using the onEdite function that comes from App component
    //but we do a controling here first ,we say if user
    //put too much charachters (so we defind for each filed how much the limitation is, like <=40)
    // then the adding function should not comes into action otherwise it's good to go
    //and also in first two conditions we check user filed both word and meaning
    //because those are 2 forced to filed inputs
    if (
      editedWord &&
      editedMeaning &&
      editedWord.length <= 40 &&
      editedMeaning.length <= 100 &&
      editedExplanation.length <= 500 &&
      editedExample.length <= 500
    ) {
      onEdite(newUpdate); // the main function for updating the target card (comes from App)
      onOpeningEdite(); //it also comes from App as a handler function, to check when we press Edite
      //button so it set (setIsEditeOpen) into false to closing the Edite window
      //and let user back into main window (Cards window)
    }
  }

  //when user clicks on the edit button of any card
  //he should see the target card's information
  //like word-meaning and so on ... as the values of
  //inputs in edit windows , so then he can decide
  //what or which parts he want's to edit and
  //get update so we used (useEffect) to initialize
  //inputs values

  useEffect(() => {
    //if there is any current selected card (the state of it is in APP)
    //and by clicking on each card's edite button we also set this value
    //to that target card (in onOpeningEdite in App component we also defind that too
    //and in Word.js component that contains word card struture that goes
    //to wordList component to render , we pass the needed argument (that in
    //Word Component it called (options) to it )
    // so we get only that card's information finally
    if (currentSelectedWord) {
      setEditeWord(currentSelectedWord.word);
      setEditedMeaning(currentSelectedWord.meaning);
      setEditedExplanation(currentSelectedWord.explanation);
      setEditedExample(currentSelectedWord.example);
    }
    //this part ([currentSelectedWord]) tracks if the (currentSelectedWord)
    //state having any update or no so then use effect can alwayse
    //to the functionalitys that are inside it to be in sink and updated
  }, [currentSelectedWord]);

  return (
    <div className={EditeStyle.editeContainer}>
      <div className={EditeStyle.edite__close__header}></div>
      <div className={EditeStyle.edite__form_bg}>
        <span
          role="button"
          title="close"
          className={EditeStyle.edite_close_btn}
          onClick={onOpeningEdite}
        >
          &times;
        </span>

        {/* we force users to not put the word or meaning fileds empty 
through a conditional rendering for showing a message (we only show the meesagae but 
in case of controlling we did it in the editingContent function in last lines )  */}

        {editedWord || editedMeaning ? (
          <span
            style={{
              marginBottom: "1rem",
              textAlign: "center",
              color: "#d05d63",
              fontSize: "14px",
            }}
          >
            ensure both the&nbsp;
            <strong style={{ color: "#43a095" }}>Word</strong>&nbsp;and&nbsp;
            <strong style={{ color: "#43a095" }}>Meaning</strong>&nbsp; fields
            are filled
          </span>
        ) : (
          ""
        )}

        {/* to checking if user's input are more than limitation (in case of
        the length of characters) - we only use this part for showing messages
        we already did the functionalit in editingContent function  */}
        {editedWord.length > 40 ||
        editedMeaning.length > 100 ||
        editedExplanation.length > 500 ||
        editedExample.length > 500 ? (
          <p>Oops! 🙊 It looks like that is quite long.</p>
        ) : (
          ""
        )}

        <input
          style={{
            backgroundColor: "#6dae68",
            fontWeight: "bold",
            border: "1px solid #71716d",
          }}
          value={editedWord}
          type="text"
          onChange={(e) => setEditeWord(e.target.value)}
        />
        <textarea
          style={{
            backgroundColor: "#6dae68",
            fontWeight: "bold",
            border: "1px solid #71716d",
          }}
          value={editedMeaning}
          type="text"
          onChange={(e) => setEditedMeaning(e.target.value)}
        />
        <textarea
          value={editedExplanation}
          type="text"
          onChange={(e) => setEditedExplanation(e.target.value)}
        />
        <textarea
          value={editedExample}
          type="text"
          onChange={(e) => setEditedExample(e.target.value)}
        />
        <button
          className={EditeStyle.edit__btn}
          title="edit"
          onClick={editingContent}
          disabled={!editedWord || editedWord.trim() === "" ? true : false}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
