import React, { useState, useEffect } from "react";
import "./App.css";

function Square({ label, onClick }) {
  return (
    <button className="sub-square" onClick={onClick}>
      {label}
    </button>
  );
}

function Grid() {
  const [shiftActivated, setShiftActivated] = useState(false);
  const [whichScreen, setWhichScreen] = useState("main");
  const [isSix, setIsSix] = useState(true); // true means 6 in first two rows
  const [isDelete, setIsDelete] = useState(true);
  const [statement, setStatement] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true); // Track cursor visibility

  const handleClick = (label) => {
    console.log(`Square ${label} clicked! Generate grid again...`);
    // Logic to generate grid again
    if (label === "Shift") {
      setShiftActivated(!shiftActivated);
    } else if (label === "Back" || label.length === 1) {
      setIsSix(true);
      setWhichScreen("main");
      setIsDelete(true);
    } else if (label === "Space") {
      if (statement.length > 0) {
        setStatement(statement + "\u00A0");
      } else {
        setStatement("\u00A0"); // If statement is empty, set it to a single space
      }
    } else if (label === "Delete") {
      if (statement.length > 0) {
        setStatement(statement.substring(0, statement.length - 1));
      } else {
        setStatement("");
      }
    } else {
      setWhichScreen(label);
      setIsSix(false);
      setIsDelete(false);
    }

    if (label === "uvwx\nyz" || label === "UVWX\nYZ") {
      setIsSix(true);
    }
    if (label.length === 1) {
      setStatement(statement + label);
    }
  };

  useEffect(() => {
    // Toggle cursor visibility every 500ms
    const interval = setInterval(() => {
      setCursorVisible((prevVisible) => !prevVisible);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Custom function to generate labels for each square
  const generateLabels = () => {
    switch (whichScreen) {
      case "abcd":
      case "ABCD":
        return shiftActivated ? ["A", "B", "C", "D"] : ["a", "b", "c", "d"];
      case "efgh":
      case "EFGH":
        return shiftActivated ? ["E", "F", "G", "H"] : ["e", "f", "g", "h"];
      case "ijkl":
      case "IJKL":
        return shiftActivated ? ["I", "J", "K", "L"] : ["i", "j", "k", "l"];
      case "mnop":
      case "MNOP":
        return shiftActivated ? ["M", "N", "O", "P"] : ["m", "n", "o", "p"];
      case "qrst":
      case "QRST":
        return shiftActivated ? ["Q", "R", "S", "T"] : ["q", "r", "s", "t"];
      case "uvwx\nyz":
      case "UVWX\nYZ":
        return shiftActivated
          ? ["U", "V", "W", "X", "Y", "Z"]
          : ["u", "v", "w", "x", "y", "z"];
      case "main":
        return shiftActivated
          ? ["ABCD", "EFGH", "IJKL", "MNOP", "QRST", "UVWX\nYZ"]
          : ["abcd", "efgh", "ijkl", "mnop", "qrst", "uvwx\nyz"];
    }
  };

  // Define the starting index for each group of squares
  const startingIndices = isSix ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3];
  const fixedIndices = [0, 1, 2];
  const specialLabels = isDelete
    ? ["Shift", "Space", "Delete"]
    : ["Shift", "Space", "Back"];

  return (
    <div className="container">
      <div className="statement-container">
        <div>
          {/* Display statement and blinking cursor */}
          {statement || "\u00A0"}
        </div>
        <div>{cursorVisible ? "|" : "\u00A0"}</div>
      </div>

      <div className={isSix ? "keyboard6" : "keyboard4"}>
        {/* Loop through the starting indices array */}
        {startingIndices.map((startIndex, index) => (
          <Square
            key={index}
            label={generateLabels()[startIndex]}
            onClick={() => handleClick(generateLabels()[startIndex])}
          />
        ))}
      </div>
      <div className="singleRow">
        {/* Loop through the starting indices array */}
        {fixedIndices.map((fixedIndex, index) => (
          <Square
            key={index}
            label={specialLabels[fixedIndex]}
            onClick={() => handleClick(specialLabels[index])}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <Grid />
    </div>
  );
}

export default App;
