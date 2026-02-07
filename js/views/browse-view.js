/**
 * @file Renders the content for the "Browse" view
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";
import * as utils from "../utils/render-utils.js";
import * as components from "../components/components.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description renders the browse view and contains helper functions to assist
 * @param {Object} appData contains references and data needed throughout the app
 */
function renderBrowseView(appData) {
  utils.scrollToTop();
  // adjust page title
  $.qs("title").textContent = "Browse | Closet Collection";

  const numMatches = $.qs("#browse-num-matches");
  const removeFilterBtns = $.qs("#remove-filter-btns");
  const browseList = $.qs("#browse-product-list");
  const sortingOptions = $.qs("#sorting-options");
  const filters = $.qs("#filters");

  // reset filter checkboxes
  resetAllFilters();

  // render all color filters
  renderColorFilterLabels();

  // make shallow copy of products arr for currently selected products
  let currentList = [...appData.productsArr];

  // initial setup
  updateNumMatches(appData.productsArr);
  applyFilters();

  // as filters/sorting is set
  filters.addEventListener("change", applyFilters);
  sortingOptions.addEventListener("change", prepListForRender);


  // event listener for filter buttons 
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#filter-btn");
    if(btn) {
        if(btn.dataset.filterValue === "Remove All") {
          resetAllFilters();
        } else {
          const value = btn.dataset.filterValue;
          resetSingleFilter(value);
        }
        applyFilters();
    } 
  });



  function updateNumMatches(arr) {
    if (arr.length > 0) {
      numMatches.textContent = `${arr.length} Items`;
    } else {
      numMatches.textContent = "No Items Found";
    }
  }

  function prepListForRender() {
    const sortedList = [...currentList];
    if (sortingOptions.value === "product") {
      utils.sortProductsAlphabetically(sortedList);
    }
    if (sortingOptions.value === "price") {
      utils.sortProductsByPrice(sortedList);
    }
    if (sortingOptions.value === "category") {
      utils.sortProductsByCategory(sortedList);
    }
    utils.removeAllChildren(browseList);
    components.renderProductCards(sortedList, appData, browseList);
  }

  function resetSingleFilter(value) {
    const formVals = $.qsa("input[type='checkbox']:checked", filters);
    for (let f of formVals) {
      if(f.value === value) {
        f.checked = false;
        if(formVals.length > 1) {
          const node = $.qs(`button[data-filter-value='${value}']`);
          removeFilterBtns.removeChild(node);
        } else {
          utils.removeAllChildren(removeFilterBtns);
        }
      }
    }
  }
  
  function resetAllFilters() {
    const formVals = $.qsa("input[type='checkbox']:checked", filters);
    for (let f of formVals) {
      f.checked = false;
    }
    utils.removeAllChildren(removeFilterBtns);
  }

  function applyFilters() {
    // convert node lists to arrays with spread op and map values
    const genderFormVals = $.qsa("input[name='gender']:checked", filters);
    const catFormVals = $.qsa("input[name='category']:checked", filters);
    const sizeFormVals = $.qsa("input[name='size']:checked", filters);
    const colorFormVals = $.qsa("input[name='color']:checked", filters);
    // see how this plays, kind of prefer this syntax to spread
    // const foo = Array.from(genderFormVals).map(e => e.value);
    const genderFilters = [...genderFormVals].map(e => e.value);
    const categoryFilters = [...catFormVals].map(e => e.value);
    const sizeFilters = [...sizeFormVals].map(e => e.value);
    const colorFilters = [...colorFormVals].map(e => e.value);

    // filter out all matches for the active filters 
    currentList = appData.productsArr.filter((element) => {
      // check arr val exists and is for this gender
      if ((genderFilters.length > 0) &&
        !(genderFilters.includes(element.gender))) {
        return false;
      }
      // check arr val exists and is for this category
      if ((categoryFilters.length > 0) &&
        !(categoryFilters.includes(element.category))) {
        return false;
      }
      // check arr val exists and sizes arr in el is for this color
      if ((sizeFilters.length > 0) &&
        !(element.sizes.some((size) => sizeFilters.includes(size)))) {
        return false;
      }
      // check arr val exists and colors arr in el is for this color
      if ((colorFilters.length > 0) &&
        !(element.color.some((color) => colorFilters.includes(color.name)))) {
        return false;
      }
      // match found
      return true;
    });

    renderFilterBtns();
    updateNumMatches(currentList);
    prepListForRender();

    function renderFilterBtns() {

      removeFilterBtns.innerHTML = "";
      
      if ((genderFormVals.length > 0) || (catFormVals.length > 0) ||
          (sizeFormVals.length > 0) || (colorFormVals.length > 0)) {
            createBtn("Remove All");
          }

      if (genderFormVals.length > 0) {
        for (let g of genderFormVals) {
          createBtn(g.value);
        }
      }
      if (catFormVals.length > 0) {
        for (let c of catFormVals) {
          createBtn(c.value);
        }
      }
      if (sizeFormVals.length > 0) {
        for (let s of sizeFormVals) {
          createBtn(s.value);
        }
      }
      if (colorFormVals.length > 0) {
        for (let c of colorFormVals) {
          createBtn(c.value);
        }
      }

      function createBtn(value) {
        const btnTmp = $.qs("#filter-btn-tmp");
        const clone = btnTmp.content.cloneNode(true);
        const btn = $.qs("button", clone);
        const span = $.qs("span", btn);
        btn.dataset.filterValue = value;
        span.textContent += value;
        $.ac(clone, removeFilterBtns);
      }

    }
  }

  /**
   * @description renders the labels for the color filters in the browse view
   */
  function renderColorFilterLabels() {
    const colors = extractColors();
    const colorsFieldset = $.qs("#color-filter-labels");
    const labelTmp = $.qs("#filter-color-label-tmp");
    utils.removeAllChildren(colorsFieldset);

    for (let c of colors) {
      const clone = labelTmp.content.cloneNode(true);
      const input = $.qs("input", clone);
      const div = $.qs("div", clone);
      const span = $.qs("span", clone);
      input.value = c.name;
      div.style.backgroundColor = c.hex;
      span.textContent = c.name;
      $.ac(clone, colorsFieldset);
    }

    /**
     * @description extracts colors from products, sorts, and removes duplicates
     * @returns {Array} array of sorted product colors with duplicates removed
     */
    function extractColors() {
      // get array of color objects
      const colors = appData.productsArr.flatMap(p => p.color);
      // sort by name
      utils.sortProductsAlphabetically(colors);
      // remove duplicates
      for (let i = 0; i < colors.length - 1; i++) {
        if (colors[i].name === colors[i + 1].name) {
          colors.splice(i + 1, 1);
          i -= 1;
        }
      }
      return colors;
    }
  }

}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  renderBrowseView
}