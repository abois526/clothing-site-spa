/**
 * @file Functions to set the placeholder images up so they can be worked with.
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description Preps the images array for use by modifying sizes and object attributes
 * @param {Array} imagesArr array of all images
 * @param {Array} productsArr array of product data
 */
function prepimagesArray(imagesArr, productsArr) {
  for(let i = 0; i < 100; i++){
    imagesArr[i].id = productsArr[i].id;
    let subStr = imagesArr[i].download_url.slice(0, 29);
    imagesArr[i].width = 1000;
    imagesArr[i].height = 1200;
    imagesArr[i].download_url = subStr + imagesArr[i].width + "/" + imagesArr[i].height;
  }
}

/**
 * @description Creates a map of images to assist with matching the img src's url to the correct product by product id
 * @param {Array} imagesArr array of all images
 * @returns {Map} map of images with id as the key and url as value 
 */
function mapImagesById(imagesArr) {
  const map = new Map();
  for(let i of imagesArr) {
    map.set(i.id, i.download_url);
  }
  return map;
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
    prepimagesArray,
    mapImagesById
}