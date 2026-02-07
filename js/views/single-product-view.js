/**
 * @file Renders the content for the "Single Product" view
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";
import * as components from "../components/components.js";
import * as compUtils from "../components/component-utils.js";
import * as utils from "../utils/render-utils.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description renders the single product view and contains helper functions to assist
 * @param {Object} product the particular product thats being rendered
 * @param {Object} appData contains references and data needed throughout the app
*/
function renderSingleProductView(product, appData) {
  // scroll to top of viewport
  utils.scrollToTop();
  // adjust page title
  const itemName = product.name;
  const gender = product.gender;
  const genderFormatted = gender[0].toUpperCase() + gender.slice(0).substring(1, gender.length - 1);
  $.qs("title").textContent = `${itemName} for ${genderFormatted} | Closet Collection`;

  renderBreadcrumb(genderFormatted, product.category, itemName);
  renderProductDetails(product);
  renderProductImages(appData, product);
  // renderRelatedProductsBackup(appData, product);
  renderRelatedProducts(appData, product);

}

function renderRelatedProducts(appData, product) {
  const relatedProducts = appData.productsArr.filter((e) => {
    return e.category === product.category;
  });
  const relatedProductsCardRow = $.qs("#related-products-card-row");
  utils.removeAllChildren(relatedProductsCardRow);
  for (let i = 0; i < 4; i++) {
    let li = $.ce("li");
    $.ac(li, relatedProductsCardRow);
    components.renderSingleProductCard(relatedProducts[i], appData.imageMap.get(relatedProducts[i].id), li);
  }
}

function renderRelatedProductsWIP(appData, product) {
  
  const relatedProducts = appData.productsArr.filter((e) => {
    return e.category === product.category;
  });
  
  const relatedProductsCardRow = $.qs("#related-products-card-row");
  utils.removeAllChildren(relatedProductsCardRow);
  
  let arr = [];
  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * (10 * i));
    const length = relatedProducts.length;
    while (arr.some((e) => i === (num % length))) {
      num += 1;
    }

    let li = $.ce("li");
    $.ac(li, relatedProductsCardRow);

    components.renderSingleProductCard(relatedProducts[num % length], appData.imageMap.get(relatedProducts[num % length].id), li);
  }
}

function renderProductImages(appData, product) {
  const spvImages = $.qsa("#spv-image");
  for (let img of spvImages) {
    img.setAttribute("src", appData.imageMap.get(product.id));
  }
}

function renderProductDetails(product) {
  const spvTitle = $.qs("#spv-product-title");
  const spvPrice = $.qs("#spv-product-price");
  const spvDesc = $.qs("#spv-product-description");
  const spvMaterial = $.qs("#spv-product-material");
  const spvSizes = $.qs("#spv-product-sizes");
  const spvColor = $.qs("#spv-product-color");
  const spvAddToCart = $.qs("#spv-add-to-cart");
  spvTitle.textContent = product.name;
  spvPrice.textContent = `$${product.price.toFixed(2)}`;
  spvDesc.textContent = product.description;
  spvMaterial.textContent = product.material;
  utils.removeAllChildren(spvSizes);
  compUtils.renderSizesSpan(product.sizes, spvSizes);
  spvColor.style.backgroundColor = product.color[0].hex;
  spvAddToCart.dataset.productId = product.id;
}

function renderBreadcrumb(gender, category, name) {
  const genderCrumb = $.qs("#gender-crumb");
  const categoryCrumb = $.qs("#category-crumb");
  const titleCrumb = $.qs("#title-crumb");
  genderCrumb.textContent = gender;
  categoryCrumb.textContent = category;
  titleCrumb.textContent = name;
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  renderSingleProductView
}