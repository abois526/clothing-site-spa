/**
 * @file Renders reusable components for different views
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";
import * as utils from "../utils/render-utils.js";
import * as compUtils from "./component-utils.js"

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description renders multiple product cards, populated with the info contained in the objects in the array
 * @param {Array} arr array containing product items
 * @param {Object} appData contains references and data needed throughout the app
 * @param {Node} parent the parent element each card will be appended to
 */
function renderProductCards(arr, appData, parent) {
  utils.removeAllChildren(parent);
  for (let i = 0; i < arr.length; i++) {
    renderSingleProductCard(arr[i], appData.imageMap.get(appData.productsArr[i].id), parent);
  }
}

/**
 * @description renders a signle product card, populated with the info of a product
 * @param {Object} item the product item the card will be populated with
 * @param {Object} image the product image the card will be populated with
 * @param {Node} parent the parent element the product card will be appended to
 */
function renderSingleProductCard(item, image, parent) {
  const productCardTmp = $.qs("#product-card-tmp");
  const clone = productCardTmp.content.cloneNode(true);
  const title = $.qs("#product-card-title", clone);
  const desc = $.qs("#product-card-description", clone);
  const color = $.qs("#product-card-color", clone);
  const sizes = $.qs("#product-card-sizes", clone);
  const price = $.qs("#product-card-price", clone);
  const cardImage = $.qs("#product-card-img", clone);
  const imgContainer = $.qs("#img-container", clone);
  const btn = $.qs("button", clone);

  title.textContent = item.name;

  desc.textContent = item.description;

  color.style.backgroundColor = item.color[0].hex;

  compUtils.renderSizesSpan(item.sizes, sizes);

  price.textContent = `$${item.price.toFixed(2)}`;

  cardImage.setAttribute("src", image);

  imgContainer.setAttribute("data-product-id", item.id);
  btn.setAttribute("data-product-id", item.id);

  $.ac(clone, parent);
}


/**
 * @description renders a single category card with info about the category
 * @param {String} category the product category for the card being rendered
 * @param {Object} appData contains references and data needed throughout the app
 * @param {Node} parent the parent node of the card   
 * @param {String} gender the gender for the page view (mens vs womens)
 */
function renderCategoryCard(category, appData, parent, gender) {
  const categoryCardTmp = $.qs("#category-card-tmp");
  const clone = categoryCardTmp.content.cloneNode(true);
  const span = $.qs("#category-card-span", clone);
  const li = $.ce("li");
  const categoryImg = $.qs("#category-card-img", clone);
  const imgContainer = $.qs("#img-container", clone);

  const match = appData.productsArr.find(p => p.category === category);
  categoryImg.setAttribute("src", appData.imageMap.get(match.id));

  span.textContent = category;

  imgContainer.setAttribute("data-category-gender", gender);
  imgContainer.setAttribute("data-category-type", category);

  $.ac(clone, li);
  $.ac(li, parent);

}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  renderProductCards,
  renderSingleProductCard,
  renderCategoryCard
}