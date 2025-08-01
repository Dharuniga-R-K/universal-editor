/**
 * menu-excel.js
 * - Reads the block property 'data-source' (which holds the key to paths.json)
 * - Loads paths.json
 * - Fetches JSON from the URL in paths.json for that key
 * - Returns the JSON data as an array
 */

 async function fetchMenuData(block) {
    try {
      // Step 1: Get the key stored in the block property 'data-source'
      // Assuming the block is a DOM element with a child that has the key in an <a> tag text content
      // Adjust selector as per your actual block HTML structure
  
      // For example, find <a> inside block and get its text content (the key)
      const dataSourceLink = block.querySelector('a.button');
      if (!dataSourceLink) {
        console.error('No data-source link found inside the block');
        return [];
      }
  
      const dataSourceKey = dataSourceLink.textContent.trim(); // e.g. "/content/universal-editor/menu-excel"
      if (!dataSourceKey) {
        console.error('Data source key is empty');
        return [];
      }
  
      // Step 2: Load paths.json (adjust the relative path if needed)
      const pathsResponse = await fetch('/paths.json');
      if (!pathsResponse.ok) {
        throw new Error('Failed to load paths.json');
      }
      const paths = await pathsResponse.json();
  
      // Step 3: Use the dataSourceKey to get the URL from paths.json
      // Assuming paths.json has a key-value map like { "/content/universal-editor/menu-excel": "https://someurl.com/data.json" }
      // If paths.json is structured differently, adjust accordingly.
      const jsonUrl = paths[dataSourceKey];
      if (!jsonUrl) {
        console.error(`No URL found in paths.json for key: ${dataSourceKey}`);
        return [];
      }
  
      // Step 4: Fetch the JSON data from jsonUrl
      const dataResponse = await fetch(jsonUrl);
      if (!dataResponse.ok) {
        throw new Error(`Failed to fetch JSON data from ${jsonUrl}`);
      }
      const jsonData = await dataResponse.json();
  
      // Step 5: Return the relevant data array
      // Assuming jsonData has a "data" property containing the array of menu items
      return jsonData.data || [];
  
    } catch (error) {
      console.error('Error fetching menu data:', error);
      return [];
    }
  }
  
  // Example usage:
  // (Assuming this script runs after the block is on the page)
  
  const block = document.querySelector('.menu-excel.block');
  if (block) {
    fetchMenuData(block).then(menuItems => {
      console.log('Menu items fetched:', menuItems);
      // TODO: render menu or do something with menuItems
    });
  } else {
    console.warn('Menu-excel block not found on the page');
  }
  