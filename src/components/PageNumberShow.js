import PageNumberShowStyle from "../styles-modules/PageNumberShow.module.css";
function PageNumberShow({
  wholePage,
  currentPage,
  isOnSearch = false,
  ispinnedSort = false,
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
      {!ispinnedSort ? (
        <span>{`${
          isOnSearch ? "[Search]" : ""
        }  Page ${currentPage} OF ${wholePage}`}</span>
      ) : (
        <span>{`[Pinned] Page ${currentPage} OF ${wholePage}`}</span>
      )}
    </div>
  );
}
export default PageNumberShow;
