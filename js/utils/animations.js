/**
 * @file Handles animations for the website
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "./dom-utils.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description handles the animation for items being added to the cart
 * @param {Object} appData contains references and data needed throughout the app
 */
function addToCartAnimation(appData) {
  const cartFill = appData.cartArr.reduce((sum, element) => sum + element.quantity, 0);

  const cartBadge = $.qs("#cart-badge");

  // failsafe if setTimeout doesn't run
  cartBadge.classList.remove("bounce-top");

  cartBadge.textContent = cartFill;

  cartBadge.classList.remove("invisible");
  cartBadge.classList.add("visible");

  cartBadge.classList.remove("bounce-top");
  // force recalculation to make this actually work
  cartBadge.offsetWidth;
  cartBadge.classList.add("bounce-top");
  // avoids glitchy behaviour if user quickly adds multiple items
  const timeoutId = setTimeout(() => {
    cartBadge.classList.remove("bounce-top");
  }, 900);
  clearTimeout(timeoutId);
}

/**
 * @description handles the animation for items being removed from the cart
 * @param {Object} appData contains references and data needed throughout the app
 */
function removeFromCartAnimation(appData) {
  const cartFill = appData.cartArr.reduce((sum, element) => sum + element.quantity, 0);

  const cartBadge = $.qs("#cart-badge");

  // failsafe if setTimeout doesn't run
  cartBadge.classList.remove("bounce-top");

  cartBadge.textContent = cartFill;

  if (cartFill > 0) {
    cartBadge.classList.remove("invisible");
    cartBadge.classList.add("visible");
  } else {
    setTimeout( () => {
      cartBadge.classList.remove("visible");
      cartBadge.classList.add("invisible");
    }, 1000);
  }

  cartBadge.classList.remove("jello-horizontal");
  // force recalculation to make this actually work
  cartBadge.offsetWidth;
  cartBadge.classList.add("jello-horizontal");
  const timeoutId = setTimeout(() => {
    cartBadge.classList.remove("jello-horizontal");
  }, 1000);
  clearTimeout(timeoutId);
}

function titleHeaderAnimation(heading) {
  heading.classList.remove("tracking-in-expand");
  // force recalculation to make this actually work
  heading.offsetWidth;
  heading.classList.add("tracking-in-expand");
}

function heroImageAnimation(img) {
  img.classList.remove("kenburns-top-left");
  // force recalculation to make this actually work
  img.offsetWidth;
  img.classList.add("kenburns-top-left");
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  addToCartAnimation,
  removeFromCartAnimation,
  titleHeaderAnimation,
  heroImageAnimation
}