import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // Change current mode to newMode
    // setMode(newMode);
    // Add newMode to the history array
    if (replace === true) {
      // Use spread operator to make shallow copy without last element
      const newHistory = [...history].slice(0, -1);
      setHistory([...newHistory, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
  };

  function back() {
    // Make sure history array contains at least 1 item
    if(history.length <= 1) {
      return;
    };
    setHistory([...history].slice(0, -1));
    // setMode(history[history.length - 2]);
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
}