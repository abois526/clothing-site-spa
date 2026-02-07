/**
 * @file Sets up processes to retrieve, update, and remove data in local storage, and to retrieve data from an API before storing it in localstorage for future use
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description attempts to retrieve data from localstorage
 * @param {String} key a key for a localstorage item
 * @returns either whatever string is stored in localstorage for the key, or if it does not exist, then an empty array
 */
function retrieveStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * @description updates storage with a revised collection
 * @param {String} key a key for a localstorage item
 * @param {Array} arr the array to be stored in localstorage as a string
 */
function updateStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

/**
 * @description removes a collection from localstorage
 * @param {String} key a key for a localstorage item
 */
function removeStorage(key) {
  localStorage.removeItem(key);
}

/**
 * @description fetches data from multiple APIs at once 
 * @param {Array} urls an array of strings containing urls to APIs
 * @returns {Array} an array of JSON responses from the API
 */
async function fetchAll(urls) {
    try {
        let [url1, url2] = urls;
        const [resp1, resp2] = await Promise.all([
            fetch(url1),
            fetch(url2)
        ]);
        if (!resp1.ok || !resp2.ok) {
            throw new Error("One of the responses is not ok");
        }
        const [respData1, respData2] = await Promise.all([
            resp1.json(),
            resp2.json()
        ]);
        return [respData1, respData2];
    } catch (error) {
        console.error(error);
    }
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
export {
  retrieveStorage,
  updateStorage,
  removeStorage,
  fetchAll
}