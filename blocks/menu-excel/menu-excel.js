export default async function decorate(block) {
    try {
      // Find the link with the data source key
      const dataSourceLink = block.querySelector('a.button');
      if (!dataSourceLink) {
        console.error('No data-source link found inside the block');
        return;
      }
  
      const dataSourceKey = dataSourceLink.textContent.trim();
      if (!dataSourceKey) {
        console.error('Data source key is empty');
        return;
      }
  
      // Fetch paths.json to resolve data source key
      const pathsResponse = await fetch('/paths.json');
      if (!pathsResponse.ok) {
        throw new Error('Failed to load paths.json');
      }
      const paths = await pathsResponse.json();
  
      // Find URL by matching prefix key in mappings
      function findUrlForKey(paths, key) {
        if (!paths.mappings || !Array.isArray(paths.mappings)) return null;
        for (const mapping of paths.mappings) {
          const [prefix, url] = mapping.split(':');
          if (key.startsWith(prefix)) {
            return url;
          }
        }
        return null;
      }
  
      const jsonUrl = findUrlForKey(paths, dataSourceKey);
      if (!jsonUrl) {
        console.error(`No URL found in paths.json for key prefix: ${dataSourceKey}`);
        return;
      }
  
      // Fetch the JSON data from resolved URL
      const dataResponse = await fetch(jsonUrl);
      if (!dataResponse.ok) {
        throw new Error(`Failed to fetch JSON data from ${jsonUrl}`);
      }
      const jsonData = await dataResponse.json();
  
      // Extract the 'data' array from JSON
      const menuItems = jsonData.data || [];
  
      // TODO: Use menuItems to render your menu in the block
      // Example: clear block and append titles of menu items
      block.innerHTML = ''; // Clear existing content
      menuItems.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item['menu'] || 'No menu title';
        block.appendChild(p);
      });
    } catch (error) {
      console.error('Error in decorate:', error);
    }
  }
  