export default async function decorate(block) {
    // Find the anchor inside the block
    const anchor = block.querySelector('a.button');
  
    if (!anchor) {
      console.warn('No anchor found inside block');
      return;
    }
  
    // Get the URL from the text content inside the anchor
    const jsonUrlText = anchor.textContent.trim();
    if (!jsonUrlText) {
      console.warn('Anchor text is empty');
      return;
    }
  
    // Convert to absolute URL (if needed)
    const absoluteUrl = new URL(jsonUrlText, window.location.origin).href;
  
    try {
      // Fetch the JSON
      const response = await fetch(absoluteUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Process the JSON data as needed
      console.log('Fetched JSON data:', data);
  
      // Example: Add list of main-menu items inside the block
      const list = document.createElement('ul');
      data.data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item['main-menu'] || 'No main menu';
        list.appendChild(li);
      });
      block.appendChild(list);
  
    } catch (err) {
      console.error('Error fetching or parsing JSON:', err);
    }
  }
  