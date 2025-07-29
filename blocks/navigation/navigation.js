export default function decorate(block) {
    console.log('Block element:', block);
    
    // Check child elements inside the block
    console.log('Block children:', [...block.children]);
    
    // Check for data attribute or JSON string
    console.log('Block dataset:', block.dataset);
  
    // If you expect data in block textContent (like JSON)
    try {
      const jsonData = JSON.parse(block.textContent);
      console.log('Parsed JSON:', jsonData);
    } catch(e) {
      console.warn('No JSON data in block.textContent');
    }
    
    // Or if your data comes from somewhere else, log that source
  
    // Proceed with rendering once you have confirmed the data shape
  }
  