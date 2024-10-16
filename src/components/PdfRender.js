import PdfStyle from "../styles-modules/PdfRender.module.css";

export default function PdfRender({
  sortedArray,
  sorted,
  onOpeningPrint,
  searchInput,
}) {
  let printingMode;
  if (sorted === "normal") {
    printingMode = "All";
  }
  if (sorted === "pinned") {
    printingMode = "Pinned";
  }

  return (
    <div className={PdfStyle.pdfMainParent}>
      {/* close button */}

      <div className={PdfStyle.notToPrintOptions}>
        <span
          onClick={onOpeningPrint} // the function in click event come's from App component
          //and it contrlose an state (setIsPrintOpen) to close the print window when we are already
          //inside print window , by clicking on (X) BUTTON
          role="button"
          title="close"
          style={{
            cursor: "pointer",
            margin: "0",
            padding: "0",
            position: "absolute",
            top: "2px",
            left: "50%",
            right: "50%",
            border: "1px solid black",
            width: "1.5rem",
            height: "1.5rem",
            textAlign: "center",
          }}
        >
          &times;
        </span>
        {searchInput.trim() && sortedArray ? (
          <p style={{ marginTop: "1.5rem" }}>
            Notice that you are printing&nbsp;
            <strong style={{ textDecoration: "underline" }}>
              Based on your search
            </strong>
          </p>
        ) : (
          <p style={{ marginTop: "1.5rem" }}>
            Notice that you are printing&nbsp;
            <strong style={{ textDecoration: "underline" }}>
              {printingMode}
            </strong>
            &nbsp;words
          </p>
        )}
      </div>

      <div className={PdfStyle.pdfContainer}>
        <table>
          <thead>
            {/* titles of the table */}
            <tr>
              <th>Word</th>
              <th>Meaning</th>
              <th>Explanation</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {/* rendering the list of words in a ready to print shape 
            by reciving the structure that we made in the PdfItem component  */}
            {sortedArray.map((item) => (
              <PdfItem words={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//the structure for rendering words list for making them ready to pring (we pass this component)
// to the (PdfRender) which is the above component here on this page.
//the {words} that we destructured in this component comes from  PdfRender component
//that passed it as a prop during doing the map on it. this line basicly ( <PdfItem words={item} />)
function PdfItem({ words }) {
  return (
    <tr>
      <td className={PdfStyle.wordTable}>{words?.word}</td>
      <td className={PdfStyle.meaningTable}>{words?.meaning}</td>
      <td>{words?.explanation}</td>
      <td>{words?.example}</td>
    </tr>
  );
}
