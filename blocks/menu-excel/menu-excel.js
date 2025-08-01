export default async function decorate(block) {
    // Find the anchor with the JSON URL inside the block
    const anchor = block.querySelector('a.button');
  
    if (!anchor) {
      console.warn('No anchor with JSON URL found inside block');
      return;
    }
  
    // Get href (relative or absolute URL)
    const jsonUrl = anchor.getAttribute('href');
    if (!jsonUrl) {
      console.warn('Anchor has no href attribute');
      return;
    }
  
    // Convert to absolute URL
    const absoluteUrl = new URL(jsonUrl, window.location.origin).href;
  
    try {
      // Fetch the JSON
      const response = await fetch(absoluteUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Do something with the data array
      console.log('Fetched JSON data:', data);
  
      // Example: add a simple list of menu names inside the block
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
  