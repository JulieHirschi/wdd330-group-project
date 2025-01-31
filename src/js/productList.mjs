import { getData } from "./productData.mjs";

export default function productList(selector, category) {

    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);
    // get the list of products 
    const products = getData(category);
    // render out the product list to the element
    renderList(products, element);

}
// productList.mjs
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of product ${product.Name}"/>

    <h3 class="card__brand">${product.Brand}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
  </li>`
}
function renderList(list, el) {
    const htmlStrings = list.map(productCardTemplate);
    el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
}            
