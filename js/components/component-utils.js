/**
 * @file Helper functions to assist with rendering components 
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "../utils/dom-utils.js";

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description renders a span full of the sizes of a given object
 * @param {Array} arr the array of sizes to fill the span
 * @param {Node} parent the parent element the span will be attached to
 */
function renderSizesSpan(arr, parent) {
  for (let a of arr) {
    const labelTmp = $.qs("#product-card-size-label");
    const clone = labelTmp.content.cloneNode(true);
    const span = $.qs("span", clone);
    const input = $.qs("input", clone);
    span.textContent = a;
    input.value = a;
    $.ac(clone, parent);
  }
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
    renderSizesSpan
}
