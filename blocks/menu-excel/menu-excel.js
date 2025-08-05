export default async function decorate(block) {
    const rawPath = block.querySelector("a")?.getAttribute("href");
    if (!rawPath) return;
  
    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const data = json.data;
  
    // Group data by main-menu
    const grouped = {};
    data.forEach(item => {
      const main = item["main-menu"];
      if (!grouped[main]) grouped[main] = [];
      grouped[main].push(item);
    });
  
    block.innerHTML = "";
  
    // Main menu block (left column)
    const mainMenuWrapper = document.createElement("div");
    mainMenuWrapper.className = "main-menu-wrapper";
  
    const selectLabel = document.createElement("span");
    selectLabel.textContent = "SELECT THE INDICATION";
  
    const mainMenuButton = document.createElement("div");
    mainMenuButton.className = "main-menu-button";
  
    const mainMenus = Object.keys(grouped);
    let selectedMain = mainMenus[0];
    mainMenuButton.innerHTML = `<span class="label">${selectedMain}</span> <span class="main-menu-arrow">▶</span>`;
  
    const dropdown = document.createElement("ul");
    dropdown.className = "main-menu-dropdown";
    dropdown.style.display = "none"; // hidden by default
  
    mainMenus.forEach(menu => {
      const li = document.createElement("li");
      li.textContent = menu;
      li.onclick = (e) => {
        e.stopPropagation();
        selectedMain = menu;
        mainMenuButton.querySelector(".label").textContent = menu;
        dropdown.style.display = "none";
        mainMenuButton.querySelector(".main-menu-arrow").textContent = "▶";
        renderSubmenus();
      };
      dropdown.appendChild(li);
    });
  
    // Toggle dropdown on button click
    mainMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = dropdown.style.display === "block";
      dropdown.style.display = isVisible ? "none" : "block";
      
      // Toggle arrow
      const arrow = mainMenuButton.querySelector(".main-menu-arrow");
      arrow.textContent = isVisible ? "▶" : "▼";
      
    });
  
    // Keep dropdown open if hovering over it
    mainMenuWrapper.addEventListener("mouseenter", () => {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "block";
      }
    });
  
    // Close dropdown on outside click
    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });
  
    mainMenuWrapper.append(selectLabel, mainMenuButton, dropdown);
    block.appendChild(mainMenuWrapper);
  
    // Right side: submenu display
    const submenuWrapper = document.createElement("div");
    submenuWrapper.className = "submenu-wrapper";
    block.appendChild(submenuWrapper);
  
    function renderSubmenus() {
        submenuWrapper.innerHTML = "";
        const rows = grouped[selectedMain];
      
        const submenuMap = {};
        const submenuLinks = {}; // Define this object before the loop
      
        rows.forEach(row => {
          const sub = row["sub-menu"];
          if (!submenuMap[sub]) submenuMap[sub] = [];
          submenuMap[sub].push({ title: row.menu, link: row.link });
      
          if (!submenuLinks[sub]) submenuLinks[sub] = row.link1 || row.link; // fallback to row.link if link1 not present
        });
      
        Object.entries(submenuMap).forEach(([submenu, items]) => {
          const col = document.createElement("div");
          col.className = "submenu-column";
      
          // Create an anchor element for submenu title
          const title = document.createElement("a");
          title.className = "submenu-title";
          title.textContent = submenu;
          title.href = submenuLinks[submenu] || "#"; // link for the sub-menu title
          title.target = "_blank";  // open in new tab
          title.style.cursor = "pointer";
          col.append(title);
      
          const hasValidItems = items.some(item => item.title && item.title.trim() !== "");

          if (hasValidItems) {
            const arrow = document.createElement("div");
            arrow.className = "submenu-arrow";
            arrow.textContent = "▼";
            col.append(arrow);
        } 
      
          const list = document.createElement("ul");
          items.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = item.link;
            a.textContent = item.title;
            a.target = "_blank";
            li.appendChild(a);
            list.appendChild(li);
          });
      
          col.append(list);
          submenuWrapper.appendChild(col);
        });
      }
      
  
    renderSubmenus();
  }
  