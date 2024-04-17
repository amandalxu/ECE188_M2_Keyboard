import React, { useState } from "react";
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
    } else if (label === "Delete") {
    } else {
      setWhichScreen(label);
      setIsSix(false);
      setIsDelete(false);
    }

    if (label === "uvwx\nyz" || label === "UVWX\nYZ") {
      setIsSix(true);
    }
  };

  // Custom function to generate labels for each square
  const generateLabels = () => {
    switch (whichScreen) {
      case "abcd":
      case "ABCD":
        return shiftActivated ? ["A", "B", "C", "D"] : ["a", "b", "c", "d"];

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
