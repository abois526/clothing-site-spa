/**
 * @file Renders the content for the "Home" page
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";
import * as components from "../components/components.js";
import * as utils from "../utils/render-utils.js";
import * as anim from "../utils/animations.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description renders the home view and contains helper functions to assist
 * @param {Object} appData contains references and data needed throughout the app
*/
function renderHomeView(appData) {
  // scroll to top of viewport 
  utils.scrollToTop();
  // adjust page title
  $.qs("title").textContent = "Closet Collection: Clothing, Shoes and Accessories for Men and Women";
  // set up animation
  const heading = $.qs("#heading-anim-home");
  anim.titleHeaderAnimation(heading);

  // populate featured product cards
  // sort out actual logic later, placeholder
  const featuredArr = [];
  for (let i = 0; i < appData.productsArr.length; i += 10) {
    featuredArr.push(appData.productsArr[i]);
  }
  const featuredProducts = $.qs("#featured-products-cards");
  utils.removeAllChildren(featuredProducts);
  components.renderProductCards(featuredArr, appData, featuredProducts);
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  renderHomeView
}