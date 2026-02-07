/**
 * @file Renders the content for the "Cart" view
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";
import * as utils from "../utils/render-utils.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description renders the cart view and contains helper functions to assist
 * @param {Object} appData contains references and data needed throughout the app
 */
function renderCartView(appData) {
  utils.scrollToTop();
  // adjust page title
  $.qs("title").textContent = "Shopping Cart | Closet Collection";

  const headerText = $.qs("#cart-header-text");
  const itemsList = $.qs("#cart-items-list");
  const itemLiTmp = $.qs("#cart-list-item-tmp");
  const shippingInfo = $.qs("#cart-shipping-info");
  const orderSummary = $.qs("#cart-order-summary");

  if (appData.cartArr.length === 0) {
    const parent = $.qs("#cart-remove-all-btn");
    utils.removeAllChildren(parent);
    headerText.textContent = "Looks like your cart is currently empty";
    itemsList.classList.add("hidden");
    shippingInfo.classList.add("hidden");
    orderSummary.classList.add("hidden");
  } else {
    itemsList.classList.remove("hidden");
    shippingInfo.classList.remove("hidden");
    orderSummary.classList.remove("hidden");

    const cartFill = appData.cartArr.reduce((prev, e) => prev + e.quantity, 0);
    headerText.textContent = `Your Cart (${cartFill})`;

    const template = $.qs("#icon-btn"); 
    const clone = template.content.cloneNode(true);
    const btn = $.qs("button", clone);
    btn.id = "cart-remove-all-btn";
    const parent = $.qs("#cart-remove-all-btn");
    utils.removeAllChildren(parent);
    $.ac(clone, parent);

    let merchValue = 0;
    let shippingValue = 0;
    let taxValue = 0;
    let totalValue = 0;
    
    

    utils.removeAllChildren(itemsList);
    for (let item of appData.cartArr) {
      const clone = itemLiTmp.content.cloneNode(true);
      const cartListLi = $.qs("#cart-list-li", clone);
      cartListLi.dataset.productId = item.id;
      cartListLi.dataset.productSize = item.size;
      const itemName = $.qs("#cart-item-name", clone);
      const itemImg = $.qs("#cart-item-img", clone);
      const itemSubtotal = $.qs("#cart-item-subtotal", clone);
      const itemInfo = $.qs("#cart-item-info", clone);
      const itemPrice = $.qs("#cart-item-price", clone);
      const itemQuantity = $.qs("#cart-item-quantity", clone);
      itemName.textContent = item.name;
      itemImg.setAttribute("src", appData.imageMap.get(item.id));
      itemSubtotal.textContent = `$${(item.quantity * item.price).toFixed(2)}`;
      itemInfo.textContent = `#${item.id} / ${item.colorName} / ${item.size}`;
      itemPrice.textContent = `$${item.price.toFixed(2)}`;
      itemQuantity.textContent = `QTY: ${item.quantity}`;
      $.ac(clone, itemsList);

      merchValue += parseFloat(item.price * item.quantity);
    }

    const shippingMethod = $.qs("#shipping-method");
    const shippingDestination = $.qs("#shipping-destination");

    updateShippingCost(merchValue, shippingValue, taxValue, totalValue);
    shippingMethod.addEventListener("change", updateShippingCost);
    shippingDestination.addEventListener("change", updateShippingCost);

  }

}

/**
 * @description updates the shipping cost that is determined by the shipping method and destination
 * @param {Number} merchValue cost of merchandise
 * @param {Number} shippingValue cost of shipping
 * @param {Number} taxValue cost of tax
 * @param {Number} totalValue total value of purchase
 */
function updateShippingCost(merchValue, shippingValue, taxValue, totalValue) {

  const merchValueEl = $.qs("#merch-value");
  const shippingValueEl = $.qs("#shipping-value");
  const taxValueEl = $.qs("#tax-value");
  const totalValueEl = $.qs("#total-value");
  const shippingMethod = $.qs("#shipping-method");
  const shippingDestination = $.qs("#shipping-destination");

  const shippingCosts = {
    "Standard": {
      "Canada": 10,
      "United States": 15,
      "International": 20
    },
    "Express": {
      "Canada": 25,
      "United States": 25,
      "International": 30
    },
    "Priority": {
      "Canada": 35,
      "United States": 50,
      "International": 50
    }
  };
  merchValueEl.textContent = `$${merchValue.toFixed(2)}`;
  const methodVal = shippingMethod.value;
  const destinationVal = shippingDestination.value;
  if (merchValue > 500) {
    shippingValue = 0;
  } else {
    shippingValue = shippingCosts[methodVal][destinationVal];
  }
  shippingValueEl.textContent = `$${shippingValue.toFixed(2)}`;
  if (destinationVal === "Canada") {
    const taxRate = 0.05;
    taxValue = ((merchValue + shippingValue) * taxRate);
  } else {
    taxValue = 0;
  }
  taxValueEl.textContent = `$${taxValue.toFixed(2)}`;
  totalValue = (merchValue + shippingValue + taxValue);
  totalValueEl.textContent = `$${totalValue.toFixed(2)}`;

}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  renderCartView
}