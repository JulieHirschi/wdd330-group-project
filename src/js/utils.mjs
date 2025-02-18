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
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}


export function getParam(param = 'product') {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  category,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = list.map(l => templateFn(l, category));
  parentElement.insertAdjacentHTML(position, htmlString.join(''));
}

export function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  parentElement.insertAdjacentHTML(position, templateFn);
  if (callback) {
    callback(data);
  }
}
function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}
const headerTemplateFn = loadTemplate('/partials/header.html');
const footerTemplateFn = loadTemplate('/partials/footer.html');

export function loadHeaderFooter() {
  headerTemplateFn().then((header) => {
    renderWithTemplate(header, qs('header'), null, null, 'beforeend', false);
  });
  footerTemplateFn().then((footer) => {
    renderWithTemplate(footer, qs('footer'), null, null, 'beforeend', false);
  });
}
