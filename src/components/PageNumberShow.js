import PageNumberShowStyle from "../styles-modules/PageNumberShow.module.css";
function PageNumberShow({
  wholePage,
  currentPage,
  isOnSearch = false,
  ispinnedSort = false,
  setStartPage,
  setEndPage,
  handleSavePageNumber,
}) {
  return (
    <div
      className={PageNumberShowStyle.parent}
      style={{
        backgroundColor: !ispinnedSort
          ? isOnSearch
            ? "#F1F2E4"
            : "#fbecdb"
          : "#4C585B",

        color: ispinnedSort ? "white" : "black",
      }}
    >
      <button
        onClick={() => {
          setStartPage(0);
          setEndPage(9);
          handleSavePageNumber(0, 9);
        }}
        title="Go to First Page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem ,",
          transform: "translateX(-20px)",
          width: "20px",
          height: "20px",
          borderRadius: "100%",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ transform: "translateY(-1px) translateX(-1px)" }}>
          {" "}
          &#10092;
        </span>
      </button>
      {!ispinnedSort ? (
        <span>{`${
          isOnSearch ? "[Search]" : ""
        }  Page ${currentPage} OF ${wholePage}`}</span>
      ) : (
        <span>{`[Pinned] Page ${currentPage} OF ${wholePage}`}</span>
      )}
      <button
        onClick={() => {
          setStartPage(wholePage * 9 - 9);
          setEndPage(wholePage * 9);
          handleSavePageNumber(wholePage * 9 - 9, wholePage * 9);
        }}
        title="Go to Last Page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem ,",
          transform: "translateX(20px)",
          width: "20px",
          height: "20px",
          borderRadius: "100%",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ transform: "translateY(-1px) translateX(1px)" }}>
          &#10093;
        </span>
      </button>
    </div>
  );
}
export default PageNumberShow;
