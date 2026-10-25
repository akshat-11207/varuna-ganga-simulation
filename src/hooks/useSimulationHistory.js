import { useState } from 'react';

export function useSimulationHistory() {
  // History array to keep track of past states
  const [history, setHistory] = useState([[]]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  // Active STPs array based on current history index
  const activeSTPs = history[currentIndex];

  // Action: Add STP
  const installSTP = (sewerId) => {
    if (activeSTPs.includes(sewerId)) return; // Prevents duplicates

    const nextState = [...activeSTPs, sewerId];
    // Slice past undo states if a new action is performed
    const updatedHistory = [...history.slice(0, currentIndex + 1), nextState];

    setHistory(updatedHistory);
    setCurrentIndex(updatedHistory.length - 1);
  };

  // Action: Undo
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Action: Redo
  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Action: Reset
  const reset = () => {
    setHistory([[]]);
    setCurrentIndex(0);
  };

  return {
    activeSTPs,
    installSTP,
    undo,
    redo,
    reset,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
}