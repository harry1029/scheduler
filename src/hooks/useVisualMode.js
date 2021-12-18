import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // Add newMode to the history array
    if (replace === true) {
      // Use spread operator to make shallow copy without last element
      const newHistory = [...history].slice(0, -1);
      setHistory([...newHistory, newMode]);
      console.log(newMode, history)
    } else {
      setHistory([...history, newMode]);
      console.log(newMode, history)
    }
  };

  function back() {
    // Make sure history array contains at least 1 item
    if (history.length <= 1) {
      return;
    };
    setHistory([...history].slice(0, -1));
  };

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}