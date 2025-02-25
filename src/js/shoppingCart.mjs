import { getLocalStorage, renderListWithTemplate } from './utils.mjs';

export default function ShoppingCart() {
  const cartItems = getLocalStorage('so-cart');
  const outputEl = document.querySelector('.product-list');
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
// Append to local storage
export function addToCart(data, category = 'tents') {
  const key = 'so-cart';
  var cart = localStorage.getItem(key);
  if (cart == null) cart = [];
  else {
    cart = JSON.parse(cart);
  }
  let existingItem = cart.find(
    (item) => item.productId === data.Id && item.category === category
  );

  if (existingItem) {
    // If the item exists, update its quantity
    existingItem.quantity += 1;
  } else {
    // If not, add the new item
    cart.push({
      category,
      productId: data.Id,
      quantity: 1,
      finalPrice: data.FinalPrice,
      imageMedium: data.Images.PrimaryMedium,
      name: data.Name,
      colorName: data.Colors[0].ColorName,
    });
  }
  localStorage.setItem(key, JSON.stringify(cart));
}
