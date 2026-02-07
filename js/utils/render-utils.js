/**
 * @file Helper functions used by multiple rendering files
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

import * as $ from "./dom-utils.js";

/**
 * @description removes all children from a parent node
 * @param {Node} parent the parent node which all children will be removed from 
 */
function removeAllChildren(parent) {
  while (parent.firstElementChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * @description Sorts the array of products by category (A-Z)
 * @param {Array} arr the array to be sorted
 */
function sortProductsByCategory(arr) {
  arr.sort((a, b) => {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  });
}

/**
 * @description Sorts the array of products alphabetically (A-Z)
 * @param {Array} arr the array to be sorted
 */
function sortProductsAlphabetically(arr) {
  arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

/**
 * @description Sorts the array of products by price in ascending order
 * @param {Array} arr the array to be sorted
 */
function sortProductsByPrice(arr) {
  arr.sort((a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

/** 
 * @description Gets the current year and fills the time tag in the copywrite section
 */
function fillCopywriteDate() {
  const date = new Date();
  $.qs("#copywrite-text date").textContent = date.getFullYear().toString();
}

export {
  removeAllChildren,
  sortProductsAlphabetically,
  sortProductsByCategory,
  sortProductsByPrice,
  scrollToTop,
  fillCopywriteDate
}