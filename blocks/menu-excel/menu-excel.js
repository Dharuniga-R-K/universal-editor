export default async function decorate(block) {
    // STEP 1: Get the JSON URL from block data attributes
    const jsonUrl = block.dataset.jsonLink;
    if (!jsonUrl) {
      console.error('Missing JSON link in block properties.');
      return;
    }
  
    try {
      // STEP 2: Fetch the JSON
      const res = await fetch(jsonUrl);
      if (!res.ok) throw new Error(`Failed to fetch JSON: ${res.status}`);
      const json = await res.json();
  
      // STEP 3: Extract data
      const menuData = json.data;
      if (!Array.isArray(menuData)) {
        console.error('Invalid JSON structure: "data" should be an array.');
        return;
      }
  
      // STEP 4: Use or render data (example rendering)
      const ul = document.createElement('ul');
      menuData.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item["main-menu"]}</strong> → ${item["menu"]}: <a href="${item.link}" target="_blank">${item["sub-menu"]}</a>`;
        ul.appendChild(li);
      });
      block.appendChild(ul);
  
    } catch (err) {
      console.error('Error loading or parsing JSON:', err);
    }
  }
  