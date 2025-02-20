const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    totalItems: 0,
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        this.calculateOrdertotal();
        this.displayOrderTotals();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemTotal =this.list.reduce((sum, item) => sum + item.finalPrice * (item.quantity || 1), 0);
    this.totalItems = this.list.reduce((sum, item) => sum + (item.quantity || 0), 0);
    this.displayItemSummary();
    
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;   // 6% tax  
    this.shipping = this.totalItems === 1 ? 10 : 10 +(this.totalItems -1) * 2 // flat rate shipping of $10 plus 2 for each item
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    },
 
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    this.totalItems = this.list.reduce((sum, item) => sum + item.quantity, 0);
  // Display the item total
  document.querySelector('.cart-total').textContent = `Total: $${this.itemTotal.toFixed(2)}`;

  
  document.querySelector('.shipping-cost').textContent = `Shipping: $${this.shipping.toFixed(2)}`;
  document.querySelector('.tax-cost').textContent = `Tax: $${this.tax.toFixed(2)}`;
  document.querySelector('.order-total').textContent = `Order Total: $${this.orderTotal.toFixed(2)}`;
},
displayItemSummary: function() {
  // This method should handle displaying item details if needed
  // For now, this is just a placeholder
  console.log("Item summary displayed");
}
  
}
export default checkoutProcess;