import wordStyle from "../styles-modules/Word.module.css";
import Speech from "react-speech";
import editIcon from "../icons/edit.svg";
import removeIcon from "../icons/remove.png";

import checkBoxStyle from "../styles-modules/SelectedWords.module.css";
import { useEffect, useState } from "react";

export default function Word({
  options,
  onSelectedWord,
  onOpeningEdite,
  onRemove,
  onCheckLastPageAfterItemRemoval,
  checkLastPageAfterItemRemovalForPinnedPanel,
  addWordToSpecialListWithCheckBox,
  handleSelectedCardWithCheckBox,
}) {
  //when user hovers on each flashcard the meaning will be shown
  const [onHoverChangeCardToShowMeaning, setOnHoverChangeCardToShowMeaning] =
    useState(options?.word);

  // when we do edite on a flashcard it has a problem of not showing the changes immidatly
  //so we let the use effect base of [options] dependency array check for
  //any changes and re-render atumaticly
  useEffect(() => {
    setOnHoverChangeCardToShowMeaning(options?.word);
  }, [options]);

  return (
    <div
      // if the (selected) attribute (that will be made when we add a new word )
      //(and will be = true if we pin a card and false if we unpin it ) was true
      //do some styling and else do the { border: "none" }
      style={
        options?.selected
          ? {
              boxShadow: "1px 1px 10px black",
              backgroundColor: "#d9e094",
              color: "#241e1a",
            }
          : { border: "none" }
      }
      className={`${wordStyle.word} ${wordStyle.wordCard}`} //this is how we add 2 class to one element
      //when we use css modules as our styling methoud

      title={`Word : ${options?.word}`}
      onMouseOver={(e) => {
        if (
          e.target.classList.contains(`${wordStyle.wordCard}`) ||
          e.target.classList.contains(`${wordStyle.word__item}`)
        ) {
          setOnHoverChangeCardToShowMeaning(options?.meaning);
        }
      }}
      onMouseOut={() => {
        setOnHoverChangeCardToShowMeaning(options?.word);
      }}
      onClick={(e) => {
        //in a card there are some other parts as child tag's on it
        //like the buttom part of the card that holds edite and remove button
        //or audio button and pin check box
        //so with this condition we say only when we clicked on the main card itself
        //and not the childs tag of it (so if that target element contains the class's we want)
        //then do the what is inside the if blocks body
        if (
          e.target.classList.contains(`${wordStyle.wordCard}`) ||
          e.target.classList.contains(`${wordStyle.word__item}`)
        ) {
          onSelectedWord(options, e); //this  prop comes from App component
          //and holds a function that sets the selected card's information
          //in a state called (currentSelectedWord) and then it gonna open a
          //MODAL windos which shows that card's informations
          //in detail , so basicly it gonna show's WordDetailsModal component
          //because it also calling a function (handleIsModalOpen())
          //that is located in App component too
        }
      }}
    >
      <li className={wordStyle.word__item}>
        {/* if meaning length was longer that 40 cut it and show 3 dots ... */}
        {onHoverChangeCardToShowMeaning?.length > 40
          ? `${onHoverChangeCardToShowMeaning.slice(0, 40)}...`
          : onHoverChangeCardToShowMeaning}
      </li>
      <div className={wordStyle.selectedwords__container}>
        <input
          title={options?.selected ? "Unpin" : "Pin"}
          className={checkBoxStyle.selectingWordsCheckBox}
          type="checkbox"
          name=""
          id=""
          checked={options?.selected ? true : false}
          onMouseOver={() => {
            handleSelectedCardWithCheckBox(options); // when we hover on th pin check box
            //through this prop that it functionality comes from App , we set the
            //(currentSelectedWord) sate to the selected card (our target card)
            //then it's ready for the next phase , that we will do it in another function
            //that we compare when ever in words array any item  was = to our target item
            //so we want to change is (selected) attribute to be  false or true (pinned or unpinned)
          }}
          onChange={() => {
            addWordToSpecialListWithCheckBox(); // this is the secound phase that i said in
            //onMouseOver commenand's i wrote .
          }}
        />
      </div>
      <div
        title="Stay online for the better voice experience!" // on audio if we want to use google voice
        //we need to be online , so if you hover and stay on it icon , it will show this message
        className={wordStyle.voice}
      >
        {/* speech library for react that i used to read the word on card */}
        <Speech
          text={options?.word}
          textAsButton={true}
          displayText="🔊"
          pitch="1"
          rate="0.7"
          volume="1"
          lang="en-GB"
          voice="Google US English"
        />
      </div>
      <div className={wordStyle.word__bottLable}>
        <img
          role="button"
          className={wordStyle.word__edit}
          src={editIcon}
          alt="edit"
          title="edit"
          onClick={() => onOpeningEdite(options)} //gonna trigger the functionality that attached
          //to onOpeningEdite prop in App
          //so it again firstly will set the (setCurrentSelectedWord) stae to our target card
          //that we want to do edit on it , so it's ready for Edit dunctionality in secound phase
          //when we do our changes and hit Edite button(in Edite.js component) (it go around all the word's and choose the one that
          //is = to (setCurrentSelectedWord) which is now our trigered card to updat
        />
        <img
          role="button"
          className={wordStyle.word__remove}
          src={removeIcon}
          alt="edit"
          title="remove"
          onClick={() => {
            onRemove(options?.id); //same as what i said in edite (previos command i wrote) but
            //now for remove
            onCheckLastPageAfterItemRemoval(); //it functionality is located in
            //WordList component, so there , i wrote completly what it doing
            //but here we control it on each indivisual card when we do deleting cards
            checkLastPageAfterItemRemovalForPinnedPanel();
          }}
        />
      </div>
    </div>
  );
}
