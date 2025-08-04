export default async function decorate(block) {
    // Find the first <a> element inside the block
    const link = block.querySelector("a");
    if (!link) {
      console.warn("No link found inside the block.");
      return;
    }
  
    // Get the href attribute value (rawPath)
    const rawPath = link.getAttribute("href");
    if (!rawPath) {
      console.warn("Link has no href attribute.");
      return;
    }
  
    // Construct absolute URL based on current origin
    const fetchUrl = new URL(rawPath, window.location.origin).href;
  
    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  
      const json = await response.json();
  
      console.log("Fetched JSON:", json);
  
      // Example: render the menu items below the link
      if (Array.isArray(json.data)) {
        const list = document.createElement("ul");
        json.data.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item.menu || "No label";
          list.appendChild(li);
        });
        block.appendChild(list);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }
  