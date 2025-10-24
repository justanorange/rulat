export const hapticFeedback = () => {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(1);
  }
};
