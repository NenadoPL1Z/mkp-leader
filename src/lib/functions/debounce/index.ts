export const debounce = (timing = 3000) => {
  let timeout: NodeJS.Timeout | null = null;

  return (callback: () => void) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(callback, timing);
  };
};
