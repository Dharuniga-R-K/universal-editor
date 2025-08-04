export default async function decorate(block) {
    const rawPath = block.querySelector("a")?.getAttribute("href");
    if (!rawPath) return;
  
    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const data = json.data;
  
    // Group by main-menu
    const grouped = {};
    data.forEach(item => {
      const main = item["main-menu"];
      if (!grouped[main]) grouped[main] = [];
      grouped[main].push(item);
    });
  
    // Clear initial block content
    block.innerHTML = "";
  
    // Create main menu wrapper (left green section)
    const mainMenuWrapper = document.createElement("div");
    mainMenuWrapper.className = "main-menu-wrapper";
  
    const selectLabel = document.createElement("span");
    selectLabel.textContent = "SELECT THE INDICATION";
  
    const mainMenuButton = document.createElement("button");
    mainMenuButton.className = "main-menu-button";
  
    const mainMenus = Object.keys(grouped);
    let selectedMain = mainMenus[0];
    mainMenuButton.textContent = selectedMain;
  
    // Main menu dropdown
    const dropdown = document.createElement("ul");
    dropdown.className = "main-menu-dropdown";
    mainMenus.forEach(menu => {
      const li = document.createElement("li");
      li.textContent = menu;
      li.onclick = () => {
        selectedMain = menu;
        mainMenuButton.textContent = menu;
        renderSubmenus();
      };
      dropdown.appendChild(li);
    });
  
    mainMenuWrapper.append(selectLabel, mainMenuButton, dropdown);
    block.appendChild(mainMenuWrapper);
  
    // Submenu wrapper (right section)
    const submenuWrapper = document.createElement("div");
    submenuWrapper.className = "submenu-wrapper";
    block.appendChild(submenuWrapper);
  
    function renderSubmenus() {
      submenuWrapper.innerHTML = "";
      const rows = grouped[selectedMain];
  
      const submenuMap = {};
      rows.forEach(row => {
        const sub = row["sub-menu"];
        if (!submenuMap[sub]) submenuMap[sub] = [];
        submenuMap[sub].push({ title: row.menu, link: row.link });
      });
  
      Object.entries(submenuMap).forEach(([submenu, items]) => {
        const col = document.createElement("div");
        col.className = "submenu-column";
  
        const title = document.createElement("div");
        title.className = "submenu-title";
        title.innerHTML = `${submenu} <span class="dropdown-arrow">▼</span>`;
  
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
  
        col.append(title, list);
        submenuWrapper.appendChild(col);
      });
    }
  
    renderSubmenus(); // Initial render
  }
  