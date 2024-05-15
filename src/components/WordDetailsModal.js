import modalStyle from "../styles-modules/WordDetailsModal.module.css";

// this modal will gets open when we click on a card ,
//so we can se the target card's information in detail
export default function WordDetailsModal({ onCard, onOpen }) {
  return (
    <div className={modalStyle.modal__container}>
      <div className={modalStyle.modal_close_container}>
        {/* close button for closing the modal by using onOpen prop that has been
        passed from App component and carries a function in it called
        handleIsModalOpen that controlse a boolean state so then conditionaly we
        can render or not render it in App component and notice that this
        function also will set the (currentSelectedWord) to our target card with
        the(setCurrentSelectedWord) so then we also have onCard prop in this
        component that is = to currentSelectedWord so then we can use it to show
        the curent Selected cards information in a butiful styled way (thi rest jsx after close button
        holds these parts i said for onCard 👇) */}
        <span
          title="close"
          className={modalStyle.modal_close_btn}
          onClick={onOpen}
        >
          &times;
        </span>
      </div>
      <hr />
      <div className={modalStyle.modal__word}>
        <label>Word</label>
        <p>{onCard?.word}</p>
      </div>
      <hr />
      <div className={modalStyle.modal__meaning}>
        <label>Meaning</label>
        <p>{onCard?.meaning}</p>
      </div>
      <hr />
      <div className={modalStyle.modal__explanation}>
        <label>Explanation</label>
        <p>{onCard?.explanation}</p>
      </div>
      <hr />
      <div className={modalStyle.modal__example}>
        <label>Example</label>
        <p>{onCard?.example}</p>
      </div>
      <hr />
    </div>
  );
}
