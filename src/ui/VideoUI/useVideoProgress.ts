import { useState } from "react";

export const useVideoProgress = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleDuration = (duration: number) => {
    setDuration(+Math.round(duration).toFixed(0));
  };

  const handleProgress = (progress: number) => {
    setProgress(+Math.round(progress).toFixed(0));
  };

  return {
    progress,
    duration,
    handleProgress,
    handleDuration,
  };
};
