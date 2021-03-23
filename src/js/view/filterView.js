import { elements } from "./base";
import { AJAX } from "../helper";
import { API_URL } from "../config";

const renderOption = function (category) {
  const markup = `<option value="${category}">${category}</option>`;
  elements.filterInput.insertAdjacentHTML("beforeend", markup);
};

export const addFilterOptions = async function () {
  const data = await AJAX(`${API_URL}posts`);
  const categories = new Set(data.map((post) => post.category));

  categories.forEach((cat) => renderOption(cat));

  elements.inputBox.forEach((el) => el.classList.add("fadeIn"));
};

export const addFilterHandler = function (handler) {
  elements.filterInput.addEventListener("change", (e) =>
    handler(e.target.value)
  );
};
