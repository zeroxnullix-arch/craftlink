export const useInputAnimation = () => {
  const handleFocus = (e) => {
    const parent = e.target.parentNode;
    parent.classList.add("focus", "not-empty");
  };
  const handleBlur = (e) => {
    const parent = e.target.parentNode;
    if (!e.target.value) parent.classList.remove("not-empty");
    parent.classList.remove("focus");
    
  };
  return { handleFocus, handleBlur };
};
