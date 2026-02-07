/**
 * @file Renders the content for the "About Us" view
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
 * @description renders the about us view and contains helper functions to assist
 * @param {Object} appData contains references and data needed throughout the app
 */
function renderAboutUsView(appData) {
  const dialog = $.qs("#about-view");
  const closeBtn = $.qs("#close-btn");

  dialog.showModal();

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });

  giveCreditWhereCreditIsDue(appData);

}

function giveCreditWhereCreditIsDue(appData) {
  const attributions = $.qs("#modal-attributions");
  for (let i of appData.imagesArr) {
    const span = $.ce("span");
    span.classList.add("block");
    span.classList.add("space-y-2");
    const p = $.ce("p");
    p.classList.add("ml-4");
    const a = $.ce("a");
    a.classList.add("text-cerulian");
    p.textContent = `${i.author} - `;
    a.setAttribute("href", i.url);
    a.textContent = "Link to Photo";
    $.ac(a, p);
    $.ac(p, span);
    $.ac(span, attributions);
  }
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  renderAboutUsView
}