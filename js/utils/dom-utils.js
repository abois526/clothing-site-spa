/**
 * @file Helper functions to assist in working with the DOM
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description helper function for querySelector()
 * @param {String} selector one or more CSS selectors
 * @param {String} parent (optional) the parent node of the selection, which is document by default
 * @returns {HTMLElement} the element that matches the selector(s)
 * @example const el = qs{".header-nav ul"};
 */
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * @description helper function for querySelectorAll()
 * @param {String} selectors one or more CSS selectors
 * @param {String} parent (optional) the parent node of the selection, which is document by default
 * @returns {NodeList} list of elements that match the selector(s)
 * @example const allCards = qsa(".cards");
 */
function qsa(selectors, parent = document) {
  return parent.querySelectorAll(selectors);
}

/**
 * @description helper function for createElement()
 * @param {String} element the element to be created
 * @returns the element that was created
 * @example const divEl = $ca("div");
 */
function ce(element) {
  return document.createElement(element);
}

/**
 * @description Helper function for appendChild()
 * @param {String} child the child element to be appended
 * @param {String} parent the parent element the child will be appended to
 * @returns the child element that was appended
 * @example const child = ac(li, ul);
 * @example ac(ce("li"), qs("#itemList")).textContent = "list item e.g.";
 */
function ac(child, parent) {
  return parent.appendChild(child);
}


// remove spaces from JSDoc if you want to use these
/* *
 * @description Helper function for cloning nodes from templates
 * @param {String} selector selector for the template
 * @returns {Node} the cloned node 
 */

/* function ct(selector) {
  const template = $.qs(selector);
  const clone = template.content.cloneNode(true);
  return clone;
} */

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  qs,
  qsa,
  ce,
  ac
}