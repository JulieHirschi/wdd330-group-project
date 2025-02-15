import { getLocalStorage } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
var total = 0;

function updateQuantity(id, change) {
  let cartItems = getLocalStorage('so-cart') || [];
  let itemIndex = cartItems.findIndex((i) => i.Id === id);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity =
      (cartItems[itemIndex].quantity || 1) + change;

    if (cartItems[itemIndex].quantity <= 0) {
      // Remove the item from the cart
      cartItems.splice(itemIndex, 1);
    }

    // Update localStorage
    localStorage.setItem('so-cart', JSON.stringify(cartItems));
    renderCartContents(); // Re-render cart
  }
}

function addEventListeners() {
  document.querySelectorAll('.increase').forEach((button) => {
    button.addEventListener('click', () =>
      updateQuantity(button.dataset.id, 1)
    );
  });

  document.querySelectorAll('.decrease').forEach((button) => {
    button.addEventListener('click', () =>
      updateQuantity(button.dataset.id, -1)
    );
  });
}

function renderCartContents() {
  let cartItems = getLocalStorage('so-cart') || [];
  total = cartItems.reduce(
    (sum, ci) => sum + ci.FinalPrice * (ci.quantity || 1),
    0
  );

  document.querySelector('.cart-total').textContent = `Total: $${total}`;
  document
    .querySelector('.cart-total-wrapper')
    .classList.toggle('hidden', cartItems.length === 0);

  document.querySelector('.product-list').innerHTML = cartItems
    .map(cartItemTemplate)
    .join('');

  addEventListeners(); // Attach event listeners after rendering
}

renderCartContents();

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="decrease" data-id="${item.Id}">-</button>
      <span>qty: ${item.quantity || 1}</span>
      <button class="increase" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice * (item.quantity || 1)}</p>
  </li>`;
}

renderCartContents();
