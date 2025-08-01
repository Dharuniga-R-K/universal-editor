async function fetchMenuData(block) {
    try {
      const dataSourceLink = block.querySelector('a.button');
      if (!dataSourceLink) {
        console.error('No data-source link found inside the block');
        return [];
      }
  
      const dataSourceKey = dataSourceLink.textContent.trim();
      if (!dataSourceKey) {
        console.error('Data source key is empty');
        return [];
      }
  
      const pathsResponse = await fetch('/paths.json');
      if (!pathsResponse.ok) {
        throw new Error('Failed to load paths.json');
      }
      const paths = await pathsResponse.json();
  
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
        return [];
      }
  
      const dataResponse = await fetch(jsonUrl);
      if (!dataResponse.ok) {
        throw new Error(`Failed to fetch JSON data from ${jsonUrl}`);
      }
      const jsonData = await dataResponse.json();
  
      return jsonData.data || [];
  
    } catch (error) {
      console.error('Error fetching menu data:', error);
      return [];
    }
  }
  