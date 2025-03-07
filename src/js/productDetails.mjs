import { addToCart } from './shoppingCart.mjs';
import { findProductById } from './externalServices.mjs';
import { getParam, renderSuperscript } from './utils.mjs';

const category = getParam('category');

export function addProductToCart(product) {
  addToCart(product, category);
}

var productData = {};

export default async function productDetails(productId) {
  productData = await findProductById(productId, category);

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

  productImage.src = productData.Images.PrimaryLarge;

  priceParagraph.textContent = `$${productData.FinalPrice}`;
  colorParagraph.textContent = productData.Colors[0].ColorName;
  descriptionParagraph.innerHTML = productData.DescriptionHtmlSimple;

  const addToCartButton = document.querySelector('#addToCart');
  addToCartButton.setAttribute('data-id', productData.Id);
}

// add to cart button event handler
async function addToCartHandler(e) {
  addProductToCart(productData, category);
  renderSuperscript(true);
}

document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
