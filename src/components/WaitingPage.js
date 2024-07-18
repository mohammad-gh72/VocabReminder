import { useEffect, useState } from "react";
import WaitingPageStyle from "../styles-modules/WaitingPage.module.css";

function WaitingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 1000);
  });
  return (
    <>
      <span className={WaitingPageStyle.waitingOverlay}></span>
      <div className={WaitingPageStyle.waitingParent}>
        <p>please wait...</p>
        <progress id="file" value={progress} max="100" />
      </div>
    </>
  );
}

export default WaitingPage;
