// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// Append to local storage
export function appendToValueInLocalStorage(key, data) {
  var existingVal = localSoragegetItem(key);
  if (existingVal == null) existingVal = '';
  else {
    existingVal = existingVal.substring(1, existingVal.length - 1);
  }

  var newVal = `${existingVal},${JSON.strigify(data)}`;

  if (newVal.startsWith(',')) newVal = newVal.substring(1, newVal.length);
  localStorage.setItem(key, `[${newVal}]`);
}