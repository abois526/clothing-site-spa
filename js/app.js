/**
 * @file Main entry point that preps the data and sets up the view router
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
import * as $ from "./utils/dom-utils.js";
import * as cart from "./services/cart-functionality.js";
import * as data from "./services/data-storage-and-retrieval.js";
import * as homeView from "./views/home-view.js";
import * as imgUtils from "./utils/placeholder-img-utils.js"
import * as renderUtils from "./utils/render-utils.js";
import * as router from "./router.js";

/*--------------------------------------
/ SECTION: Main Code
/-------------------------------------*/
document.addEventListener("DOMContentLoaded", main);

function main() {  
  const cartArr = [];
  const imagesArr = [];
  const imagesMap = [];
  const productsArr = [];
  const appData = {
    cartArr,
    imagesArr,
    imagesMap,
    productsArr,
    productsKey:  "productsData",
    imagesKey: "imagesData",
    cartKey: "shoppingCart"
  }
  
  appData.imagesArr = data.retrieveStorage(appData.imagesKey);
  appData.productsArr = data.retrieveStorage(appData.productsKey);
  appData.cartArr = data.retrieveStorage("shoppingCart");
  const cartBadge = $.qs("#cart-badge")
  if (appData.cartArr.length > 0) {
    cartBadge.classList.add("visible"); 
    cartBadge.textContent = appData.cartArr.length;
  } 
  
  if (appData.productsArr.length === 0 || appData.imagesArr.length === 0) {
    performAsyncActions(appData);
  } else {
    imgUtils.prepimagesArray(appData.imagesArr, appData.productsArr);
    appData.imageMap = imgUtils.mapImagesById(appData.imagesArr);
    $.qs("#loader").classList.add("hidden");
    initStateAndStartRouter(appData);
  }
  
}

async function performAsyncActions(appData) {
  const urls = [
    "https://gist.githubusercontent.com/rconnolly/d37a491b50203d66d043c26f33dbd798/raw/37b5b68c527ddbe824eaed12073d266d5455432a/clothing-compact.json",
    "https://picsum.photos/v2/list?page=9&limit=100"
  ];
  
  const apiData = await data.fetchAll(urls);
  const [productsArr, imagesArr] = apiData;
  
  imgUtils.prepimagesArray(imagesArr, productsArr);
  const imageMap = imgUtils.mapImagesById(imagesArr);
  
  data.updateStorage(appData.productsKey, productsArr)
  data.updateStorage(appData.imagesKey, imagesArr);
  
  appData.imagesArr = imagesArr;
  appData.imageMap = imageMap;
  appData.productsArr = productsArr;
  
  $.qs("#loader").classList.add("hidden"); 
  initStateAndStartRouter(appData);
  
}

function initStateAndStartRouter(appData) {
  // start at home view, then start up the router
  renderUtils.fillCopywriteDate();
  $.qs("#home-view").classList.remove("hidden");
  homeView.renderHomeView(appData);
  cart.enableCartFunctionality(appData);
  router.handleRouting(appData);
}