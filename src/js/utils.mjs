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
  const htmlString = list.map((l) => templateFn(l, category));
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
  }).then(renderSuperscript);
  footerTemplateFn().then((footer) => {
    renderWithTemplate(footer, qs('footer'), null, null, 'beforeend', false);
  });
}
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span >`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function renderSuperscript(withAnimation = false) {
  const cartItems = getLocalStorage('so-cart') || [];
  const totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const superscriptElement = document.querySelector('.superscript');
  if (superscriptElement) {
    superscriptElement.textContent = `${totalQuantity || ''}`;
    if (withAnimation) {
      superscriptElement.classList.add('added-to-cart');
      setTimeout(() => {
        superscriptElement.classList.remove('added-to-cart');
      }, 500); // Match the duration of the animation
    }
    
  } else {
    console.warn('Element with class "superscript" not found in the DOM.');
  }
}