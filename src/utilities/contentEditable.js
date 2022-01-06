export const selectAllInlineText = (e) => {
  e.target.focus();
  e.target.select();
};
export const saveContentAfterPressKeyDown = (e) => {
  if (e.key === "Enter") {
    e.target.blur();
  }
};
