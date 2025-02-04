import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const element = document.querySelector(selector);
  // get the list of products
  var products = await getData(category);
  products = products.filter(p => p.ListPrice != '179.99');
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, element, products);
}
// productList.mjs
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of product ${product.Name}"/>

    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
  </li>`;
}
