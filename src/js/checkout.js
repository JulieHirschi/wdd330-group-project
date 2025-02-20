import { getParam, loadHeaderFooter } from './utils.mjs';
import { checkoutProcess } from './checkoutProcess.mjs'; // Import the checkoutProcess correctly

document.addEventListener('DOMContentLoaded', function() {
    const checkoutKey = 'cartItems'; // Make sure this key matches the one used for localStorage
    const outputSelector = '.order-summary'; // Example output selector if needed
    
    // Initialize the checkout process only once
    checkoutProcess.init(checkoutKey, outputSelector); 
});

loadHeaderFooter();

