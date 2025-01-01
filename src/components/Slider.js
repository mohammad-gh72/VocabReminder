import style from "../styles-modules/Slider.module.css";
export default function Slider({
  setStartingPage,
  setEndingPage,
  startingPage,
  endingPage,
  sortedArray,
  bgColor,
  fontColor,
  handleSavePageNumber,
}) {
  //functionality of (next) button in pagination
  function handleNextBtn() {
    //the initializer (to chrome storage) for current navigated page
    // handleSaveNavigatedPage();

    //as long as the endingpage state (that comes from APP component)
    //is greater or =  comparing to the length of our card's bank array state
    //which is basicly this line in App component -
    // const [words, setWords] = useState(vocabsList);
    //then we should immidiatly retun and do a guard clause
    //to preventing any error because there is no next page anymore !
    //because the last page as we know is the lenght of an array alwayse
    //so an array like [a,b,c] has the lenght =3 , so if we say in each page we
    //want to have only one elemnt of this array so = page 1 holds (a) page 2 hold (b)
    //and last page that is third page holds (c)  so last page was = array's length

    if (endingPage >= sortedArray.length) return;
    //if the preveious condition did not stoped us so we come to this part of
    //functionality that do the actual next button functionality
    //------------
    //so when ever we click on (Next),we switch our starting page to the privious
    //endingpage value and then the new value of endingpage will get's updated to
    //the velue we wish - like here we did (endingpage previous value + 9)
    //so it's like = start(0) - end (9) / we say we see these for example in this case =>
    //1,2,3,4,5,6,7,8,9 ---- then we switch start (previous ending page value which was 9) -
    //end (9+9=18) so basicly it's like start (9)-end (18) and we have this resault for example now
    //=>10,11,12,13,14,15,16,17,18
    //and so on ...
    setStartingPage(endingPage);
    setEndingPage((end) => end + 9);
  }

  //functionality of (prev) button in pagination
  function handleBackBtn() {
    //the initializer (to chrome storage) for current navigated page
    // handleSaveNavigatedPage();

    //if the starting page state become less than or = 0 so it means
    //that we are at the starting point of array
    //so there is nothing any more if we click on (prev button)
    //so if we do not avoid it we will get erro
    //so we do a guard clouse here
    if (startingPage <= 0) return;
    //if the preveious condition did not stoped us so we come to this part of
    //functionality that do the actual (prev button) functionality
    //------------
    // if we click on prev button ,what ever out starting point was gets subtracted to a value
    //we wish (like here by 9)
    //and also the ending page too
    //so -  start (18) - end (27) after clicking on (prev button) will become =
    //start (18-9) and end (27-9) => start (9) - end (18)
    setStartingPage((start) => start - 9);
    setEndingPage((end) => end - 9);
  }

  //---------------------------------
  // notice considering all those functionalitys above , that start and ending pages states that
  //has been located in App component , will be use inside the slice methoud (its an array methoud)
  //in WordList component to rendering the Card's out of words, so ecah time we click on next
  //or prev button and we changing those states , we slice words array (the words state in App)
  //so we render  from (startpoint) to (endpoint) on indexes in array , so we kinda
  //do a pagination through that
  //like const arr=["a","b","c","d","e","f","g","h"]
  //arr.slice(0, 3);=> result is = ['a','b','c']
  //-------------------------------------

  return (
    <>
      {startingPage > 0 && (
        <button
          className={style.pagination__back}
          onClick={() => {
            handleBackBtn();
            handleSavePageNumber(startingPage - 9, startingPage);
          }}
          style={{ backgroundColor: bgColor, color: fontColor }}
        >
          &#10140;
        </button>
      )}
      {endingPage < sortedArray?.length && (
        <button
          className={style.pagination__next}
          onClick={() => {
            handleNextBtn();
            handleSavePageNumber(endingPage, endingPage + 9);
          }}
          style={{ backgroundColor: bgColor, color: fontColor }}
        >
          &#10140;
        </button>
      )}
    </>
  );
}
