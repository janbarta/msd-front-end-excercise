export const elements = {
  postContainer: document.querySelector(".container"),
  inputBox: document.querySelectorAll(".nav__input-box"),
  filterInput: document.querySelector(".nav__input-select"),
};

export const renderLoader = function (parent) {
  const loader = `<div class="loader"><div></div><div></div></div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.loader`);
  if (loader) loader.remove();
};
