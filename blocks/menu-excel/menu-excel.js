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
  
    // Build the UI
    block.innerHTML = ""; // clear block contents
  
    // Create main menu selector (dark green button)
    const mainMenuWrapper = document.createElement("div");
    mainMenuWrapper.className = "main-menu-wrapper";
  
    const selectLabel = document.createElement("span");
    selectLabel.textContent = "SELECT THE INDICATION";
  
    const mainMenuButton = document.createElement("button");
    mainMenuButton.className = "main-menu-button";
    const mainMenus = Object.keys(grouped);
    let selectedMain = mainMenus[0];
    mainMenuButton.textContent = selectedMain;
  
    mainMenuButton.onclick = () => {
      const dropdown = document.createElement("ul");
      dropdown.className = "main-menu-dropdown";
  
      mainMenus.forEach(menu => {
        const li = document.createElement("li");
        li.textContent = menu;
        li.onclick = () => {
          selectedMain = menu;
          mainMenuButton.textContent = menu;
          dropdown.remove();
          renderSubmenus();
        };
        dropdown.appendChild(li);
      });
  
      // Remove existing dropdown if any
      const existing = block.querySelector(".main-menu-dropdown");
      if (existing) existing.remove();
  
      block.appendChild(dropdown);
    };
  
    mainMenuWrapper.append(selectLabel, mainMenuButton);
    block.appendChild(mainMenuWrapper);
  
    const submenuWrapper = document.createElement("div");
    submenuWrapper.className = "submenu-wrapper";
    block.appendChild(submenuWrapper);
  
    function renderSubmenus() {
      submenuWrapper.innerHTML = "";
      const rows = grouped[selectedMain];
  
      // Group sub-menu to menu/link
      const submenuMap = {};
      rows.forEach(row => {
        const sub = row["sub-menu"];
        if (!submenuMap[sub]) submenuMap[sub] = [];
        submenuMap[sub].push({ title: row.menu, link: row.link });
      });
  
      // Render each sub-menu
      Object.entries(submenuMap).forEach(([submenu, items]) => {
        const submenuCol = document.createElement("div");
        submenuCol.className = "submenu-column";
  
        const title = document.createElement("div");
        title.className = "submenu-title";
        title.innerHTML = `${submenu} <span class="dropdown-arrow">▼</span>`;
  
        const menuList = document.createElement("ul");
        items.forEach(item => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = item.link;
          a.textContent = item.title;
          a.target = "_blank";
          li.appendChild(a);
          menuList.appendChild(li);
        });
  
        submenuCol.append(title, menuList);
        submenuWrapper.appendChild(submenuCol);
      });
    }
  
    renderSubmenus(); // initial render
  }
  