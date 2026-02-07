/**
 * @file Renders the content for the "Men's Landing" and "Women's Landing" views
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";
import * as utils from "../utils/render-utils.js";
import * as components from "../components/components.js";
import * as anim from "../utils/animations.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description renders the Men's landing page view and contains helper functions to assist
 * @param {Object} appData contains references and data needed throughout the app
*/
function renderMensLandingView(appData) {
  // scroll to top of viewport
  utils.scrollToTop();
  // adjust page title
  $.qs("title").textContent = "Men's | Closet Collection";
  // set up animations
  const heading = $.qs("#heading-anim-mens");
  anim.titleHeaderAnimation(heading);
  const img = $.qs("#img-anim-mens");
  anim.heroImageAnimation(img);

  const categoryCards = $.qs("#mens-category-cards");
  // matches object key
  const gender = "mens";
  populateCategoryCards(appData, categoryCards, gender);
}


/**
 * @description renders the Women's landing page view and contains helper functions to assist
 * @param {Object} appData contains references and data needed throughout the app
*/
function renderWomensLandingView(appData) {
  // scroll to top of viewport
  utils.scrollToTop();
  // adjust page title
  $.qs("title").textContent = "Women's | Closet Collection";
  // set up animations
  const heading = $.qs("#heading-anim-womens");
  anim.titleHeaderAnimation(heading);
  const img = $.qs("#img-anim-womens");
  anim.heroImageAnimation(img);

  const categoryCards = $.qs("#womens-category-cards");
  // matches object key
  const gender = "womens";
  populateCategoryCards(appData, categoryCards, gender);
}

function populateCategoryCards(appData, categoryCards, gender) {
  // create array of alphabetical categories w/o duplicates
  const womens = appData.productsArr.filter(p => p.gender === gender);
  const unique = womens.map(p => p.category);
  unique.sort();
  for (let i = 0; i < unique.length - 1; i++) {
    if (unique[i] === unique[i + 1]) {
      unique.splice(i + 1, 1);
      i -= 1;
    }
  }
  // populate the category cards
  utils.removeAllChildren(categoryCards);
  for (let category of unique) {
    components.renderCategoryCard(category, appData, categoryCards, gender);
  }
}

/*
TODO: finished up some of the logic I started working on and ditched to focus on other stuff, need to test this out but I think it will let me go from mens/womens landing page and jump to the browse view 
*/
function enableBrowseFilters(appData) {

  const container = $.qs("#img-container");
  const category = container.dataset.categoryType;

  applyFilter();

  renderBrowseView(currentList, appData.imageMap, appData.cartArr);

  function applyFilter() {

    // check input for category
    const categoryCheckboxes = $.qsa("input[name=[category]");
    categoryCheckboxes.forEach(element => {
      if (element.value === category) {
        element.checked = true;
      }
    });

    // convert node lists to arrays with spread op and map values
    const catFormVals = $.qsa("input[name='category']:checked", filters);
    const categoryFilters = [...catFormVals].map(e => e.value);

    // filter out all matches for the active filters 
    currentList = appData.productsArr.filter((element) => {
      // check arr val exists and is for this category
      if ((categoryFilters.length > 0) && !(categoryFilters.includes(element.category))) {
        return false;
      }
      // match found
      return true;
    });

  }
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  renderMensLandingView,
  renderWomensLandingView
}