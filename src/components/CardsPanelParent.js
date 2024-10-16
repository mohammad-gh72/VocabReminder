import { Fragment } from "react";

//parent component for basicly anything that want to be shown in main window(in first window)
export default function CardsPanelParent({ children }) {
  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
