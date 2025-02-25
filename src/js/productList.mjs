import { getProductsByCatefory } from './externalServices.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const element = document.querySelector(selector);
  document.querySelector(
    '#top-products-header'
  ).textContent = `Top Products: ${category.replace(/^./, (char) =>
    char.toUpperCase()
  )}`;
  // get the list of products
  var products = await getProductsByCatefory(category);
  products = products.filter((p) => p.ListPrice != '179.99');
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, element, products, category);
}
// productList.mjs
function productCardTemplate(product, category) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?category=${category}&product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of product ${product.Name}"/>

    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
  </li>`;
}
