export async function decorate({ block, fetch }) {
    // Get the rendered HTML from the block
    const html = block?.html;
  
    if (!html) {
      return {
        jsonData: null,
        error: "No block HTML found."
      };
    }
  
    // Use DOMParser or regex to extract the path
    const match = html.match(/<a[^>]*href="([^"]+)"[^>]*>/);
  
    const path = match?.[1];
  
    if (!path) {
      return {
        jsonData: null,
        error: "No document path found in rendered HTML."
      };
    }
  
    try {
      const response = await fetch(path);
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
  
      const jsonData = await response.json();
  
      return {
        jsonData,
        originalPath: path
      };
    } catch (err) {
      return {
        jsonData: null,
        error: `Failed to fetch JSON from ${path}: ${err.message}`
      };
    }
  }
  