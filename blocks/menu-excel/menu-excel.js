export default async function decorate(block) {
    // Look for the first link inside the block
    const link = block.querySelector("a");
  
    if (!link) {
      console.warn("No link found in block to fetch JSON.");
      return;
    }
  
    const path = link.getAttribute("href");
  
    if (!path) {
      console.warn("No href found on link.");
      return;
    }
  
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
      const json = await response.json();
  
      // You can now render using json.data
      console.log("✅ Fetched JSON:", json);
  
      // Example: show menu items below the link
      if (Array.isArray(json.data)) {
        const list = document.createElement("ul");
  
        json.data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.menu || "No label";
          list.appendChild(li);
        });
  
        block.appendChild(list);
      }
    } catch (err) {
      console.error("❌ Failed to fetch JSON:", err.message);
    }
  }
  