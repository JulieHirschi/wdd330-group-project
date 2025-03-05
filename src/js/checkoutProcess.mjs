import { getLocalStorage } from './utils.mjs';
import { checkout } from './externalServices.mjs';

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.productId, // FIXED: was item.Id
    price: item.finalPrice, // FIXED: was item.FinalPrice
    name: item.name, // FIXED: was item.Name
    quantity: item.quantity || 1,
  }));
}

const checkoutProcess = {
  key: '',
  outputSelector: '',
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.calculateItemSummary();
    this.calculateOrdertotal();
  },

  calculateItemSummary: function () {
    const summaryElement = document.querySelector(
      this.outputSelector + ' #cartTotal'
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + ' #num-items'
    );

    itemNumElement.innerText = this.list.length;

    // FIXED: Use the correct key `finalPrice` and ensure quantity is accounted for
    this.itemTotal = this.list
      .reduce((sum, item) => sum + item.finalPrice * (item.quantity || 1), 0)
      .toFixed(2);

    summaryElement.innerText = `$${this.itemTotal}`;
  },

  calculateOrdertotal: function () {
    this.shipping = 10 + (this.list.length - 1) * 2; // Simple shipping calculation

    // FIXED: Ensure tax calculation uses `finalPrice`
    this.tax = (this.itemTotal * 0.06).toFixed(2);

    // FIXED: Ensure order total is calculated properly
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);

    this.displayOrderTotals();
  },

  displayOrderTotals: function () {
    document.querySelector(
      this.outputSelector + ' #shipping'
    ).innerText = `$${this.shipping}`;
    document.querySelector(
      this.outputSelector + ' #tax'
    ).innerText = `$${this.tax}`;
    document.querySelector(
      this.outputSelector + ' #orderTotal'
    ).innerText = `$${this.orderTotal}`;
  },

  checkout: async function (form) {
    const json = formDataToJSON(form);

    // Attach order details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    console.log('Checkout Data:', json);

    try {
      const res = await checkout(json);
      console.log('Checkout Response:', res);
      if (res.message == 'Order Placed') {
        window.location.href = '../checkout/success.html';
      }
    } catch (err) {
      console.log('Checkout Error:', JSON.stringify(err));
    }
  },
};

export default checkoutProcess;
