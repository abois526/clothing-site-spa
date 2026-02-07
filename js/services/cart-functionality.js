/**
 * @file Implements the functionality for the shopping cart
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";
import * as data from "../services/data-storage-and-retrieval.js";
import * as anim from "../utils/animations.js";
import * as cartView from "../views/cart-view.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description sets up the functionality of the cart for the program
 * @param {Object} appData contains references and data needed throughout the app
 */
function enableCartFunctionality(appData) {

  /**
   * @description creates a cart item which will be used to populate the array
   */
  function CartItem(id, name, gender, price, colorName, size, quantity, sales) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.price = price;
    this.colorName = colorName;
    this.size = size;
    this.quantity = quantity;
    this.sales = sales;
  }

  document.addEventListener("click", (e) => {
    addToCart(e, appData, CartItem);
  });
  
  document.addEventListener("click", (e) => {
    removeItemFromCart(e, appData);
  });

  document.addEventListener("click", (e) => {
    removeAllFromCart(e, appData);
  });
  
}

function addToCart(e, appData, CartItem) {
  const btn = e.target.closest("button[data-product-id]");
  if(btn) {
    const productId = btn.dataset.productId;
    const productCard = btn.closest("article");
    const productSize = productCard.querySelector("input[type='radio']:checked").value;
    addToCart(e, productId, productSize);
    const product = appData.productsArr.find((e) => e.id === productId);
    snackBarHandler(`${product.name} added to cart`);

    function addToCart(e, productId, productSize) {
      e.preventDefault();
      const match = appData.productsArr.find((e) => e.id === productId);
      let cartItemIndex = appData.cartArr.findIndex((e) => e.id === productId && e.size === productSize);
  
      if (cartItemIndex === -1) { // if item does not yet exist
        const item = new CartItem(match.id, match.name, match.gender, match.price, match.color[0].name, productSize, 1, match.sales);
        appData.cartArr.push(item);
        anim.addToCartAnimation(appData);
      } else { // if item does exist in the cart
        const currItem = appData.cartArr[cartItemIndex];
        currItem.quantity += 1;
      }
  
      data.updateStorage(appData.cartKey, appData.cartArr);
      anim.addToCartAnimation(appData);
      cartView.renderCartView(appData);
    }
  }
}

function removeItemFromCart(e, appData) {
  const btn = e.target.closest("button#cart-remove-btn");
  if(btn) {
    const li = btn.closest("li");
    const productId = li.dataset.productId;
    const productSize = li.dataset.productSize;
    removeFromCart(productId, productSize);
    anim.removeFromCartAnimation(appData);

    function removeFromCart(productId, productSize) {
      let cartItemIndex = appData.cartArr.findIndex((e) => e.id === productId && e.size === productSize);

      if(cartItemIndex !== -1) { // if item exists
        const item = appData.cartArr[cartItemIndex];
        
        if(item.quantity > 1) {
          item.quantity -= 1;
        } else {
          appData.cartArr.splice(cartItemIndex, 1);
        }

        data.updateStorage(appData.cartKey, appData.cartArr);
        cartView.renderCartView(appData);
      }
    }
  }

}

function removeAllFromCart(e, appData) {
  const btn = e.target.closest("button#cart-remove-all-btn");
  if(btn) {
    appData.cartArr.length = 0;
    data.updateStorage(appData.cartKey, appData.cartArr);
    cartView.renderCartView(appData);
    anim.removeFromCartAnimation(appData);
  }
}

function snackBarHandler(message) {
  const bar = $.qs("#snackbar");
  bar.classList.remove("hidden");
  bar.textContent = message;
  setTimeout(() => {
    bar.classList.add("hidden");
  }, 4000);
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  enableCartFunctionality
}