import { appendToValueInLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

export function addProductToCart(product) {
  appendToValueInLocalStorage('so-cart', product);
}

var productData = {};

export default async function productDetails(productId) {
  productData = await findProductById(productId);

  renderProductDetails();
}

function renderProductDetails() {
  // Query select the header tags
  const header3 = document.querySelector('h3#productName');
  const header2 = document.querySelector('h2#productNameWithoutBrand');

  // Query select the image tag
  const productImage = document.querySelector('img#productImage');

  // Query select the paragraph tags
  const priceParagraph = document.querySelector('p#productFinalPrice');
  const colorParagraph = document.querySelector('p#productColorName');
  const descriptionParagraph = document.querySelector(
    'p#productDescriptionHtmlSimple'
  );

  // Set data to DOM
  header3.textContent = productData.Name;
  header2.textContent = productData.NameWithoutBrand;

  productImage.src = productData.Image;

  priceParagraph.textContent = `$${productData.FinalPrice}`;
  colorParagraph.textContent = productData.Colors[0].ColorName;
  descriptionParagraph.innerHTML = productData.DescriptionHtmlSimple;

  const addToCartButton = document.querySelector('#addToCart');
  addToCartButton.setAttribute('data-id', productData.Id);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
