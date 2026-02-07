/**
 * @file Implements the router that manages site navigation for the different views
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "./utils/dom-utils.js";
import * as aboutUsView from "./views/about-us-view.js";
import * as browseView from "./views/browse-view.js";
import * as cartView from "./views/cart-view.js";
import * as homeView from "./views/home-view.js";
import * as landingView from "./views/landing-views.js";
import * as singleProductView from "./views/single-product-view.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description handles all of the routing for the SPA 
 * @param {Object} appData contains references and data needed throughout the app
 */
function handleRouting(appData) {

  let currentId = null;

  const routes = {
    home: () => homeView.renderHomeView(appData),
    mens: () => landingView.renderMensLandingView(appData),
    womens: () => landingView.renderWomensLandingView(appData),
    browse: () => browseView.renderBrowseView(appData),
    product: (product) => singleProductView.renderSingleProductView(product, appData),
    cart: () => cartView.renderCartView(appData),
    about: () => aboutUsView.renderAboutUsView(appData)
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-route]");
    if (link) {
      if (link.dataset.productId) {
        currentId = link.dataset.productId;
      }
      renderPage(routes, link.dataset.route, appData, currentId);
    }
  });

}

/** 
 * @description Navigates to the selected view of the SPA
 * @param {Object} routes object containing all available routes for the SPA
 * @param {String} currentRoute the current route that has been selected
 */
function renderPage(routes, currentRoute, appData, currentId) {
  if (currentRoute !== "about") {
    // hide all pages
    const pages = $.qsa(".spa-page");
    pages.forEach(element => {
      element.classList.add("hidden");
    });
  }
  let product = null;
  if (currentRoute === "product") {
    product = appData.productsArr.find((e) => e.id === currentId);
  }

  // show current page
  $.qs(`#${currentRoute}-view`).classList.remove("hidden");

  // render page for specified route
  routes[currentRoute](product);
}
/*
TODO: need to adjust the logic on this a bit so when going from mens/womens to SPV I can enable the category selection's filter 
*/

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  handleRouting
}