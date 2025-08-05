export default async function decorate(block) {
    const rawPath = block.querySelector("a")?.getAttribute("href");
    if (!rawPath) return;
  
    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const data = json.data;
  
    // Group by "main-menu"
    const grouped = {};
    data.forEach(item => {
      const main = item["main-menu"];
      if (!grouped[main]) grouped[main] = [];
      grouped[main].push(item);
    });
  
    // Clear existing content
    block.innerHTML = "";
  
    // Wrapper div
    const headerBottom = document.createElement("div");
    headerBottom.className = "header__bottom";
  
    // === LEFT SIDE ===
    const leftSection = document.createElement("section");
    leftSection.className = "row region region-header-bottom-left";
  
    const navLeft = document.createElement("nav");
    navLeft.className = "menu__indications menu--indications";
    navLeft.setAttribute("aria-label", "select the Indication");
    navLeft.setAttribute("role", "navigation");
  
    const titlePrefix = document.createElement("div");
    titlePrefix.className = "indications-menu-title-prefix";
  
    const selectLabel = document.createElement("span");
    selectLabel.className = "indications-menu-title text-small";
    selectLabel.textContent = "select the Indication";
  
    const subTitleWrapper = document.createElement("span");
    subTitleWrapper.className = "indications-menu-sub-title text-regular header__headline";
  
    const selectedMainEl = document.createElement("span");
    selectedMainEl.className = "mobile-link";
    selectedMainEl.textContent = Object.keys(grouped)[0];
    selectedMainEl.setAttribute("data-url", "#"); // Will update on click
  
    subTitleWrapper.appendChild(selectedMainEl);
  
    const dropdownButton = document.createElement("i");
    dropdownButton.className = "dropdown-button";
    dropdownButton.tabIndex = 0;
  
    titlePrefix.append(selectLabel, subTitleWrapper, dropdownButton);
    navLeft.appendChild(titlePrefix);
  
    const ulLeft = document.createElement("ul");
    ulLeft.className = "menu__indications nav clearfix";
  
    Object.keys(grouped).forEach(mainMenu => {
      const li = document.createElement("li");
      li.className = "menu__indications-item nav-item";
  
      const a = document.createElement("a");
      a.className = "menu__indications-link nav-link";
      a.href = "#"; // You can use item.link if needed
      a.textContent = mainMenu;
  
      a.addEventListener("click", (e) => {
        e.preventDefault();
        selectedMainEl.textContent = mainMenu;
        renderRightMenu(mainMenu);
      });
  
      li.appendChild(a);
      ulLeft.appendChild(li);
    });
  
    navLeft.appendChild(ulLeft);
    leftSection.appendChild(navLeft);
    headerBottom.appendChild(leftSection);
  
    // === RIGHT SIDE ===
    const rightSection = document.createElement("section");
    rightSection.className = "row region region-header-bottom-right";
  
    const navRight = document.createElement("nav");
    navRight.className = "menu__mdd-internal navigation menu--mdd-internal";
    navRight.setAttribute("aria-label", "MDD Menu");
    navRight.setAttribute("role", "navigation");
  
    const ulRight = document.createElement("ul");
    ulRight.className = "menu__mdd-internal nav clearfix";
    navRight.appendChild(ulRight);
    rightSection.appendChild(navRight);
    headerBottom.appendChild(rightSection);
  
    // Append the final layout to the block
    block.appendChild(headerBottom);
  
    // === Function to render right-side menu ===
    function renderRightMenu(mainMenu) {
      ulRight.innerHTML = "";
      const subItems = grouped[mainMenu];
  
      const subMenuMap = {};
      subItems.forEach(item => {
        const sub = item["sub-menu"];
        if (!subMenuMap[sub]) subMenuMap[sub] = [];
        subMenuMap[sub].push({ title: item.menu, link: item.link });
      });
  
      Object.entries(subMenuMap).forEach(([subMenu, links]) => {
        const li = document.createElement("li");
        li.className = "menu__mdd-internal-item menu__mdd-internal-item--with-sub menu__mdd-internal-item--dropdown nav-item dropdown";
  
        const a = document.createElement("a");
        a.className = "menu__mdd-internal-link nav-link dropdown-toggle-item";
        a.href = links[0].link;
        a.innerHTML = `<span>${subMenu}</span>`;
        li.appendChild(a);
  
        const ulSub = document.createElement("ul");
        ulSub.className = "menu__mdd-internal menu__mdd-internal--sub menu__mdd-internal--sub-1 nav clearfix";
  
        links.forEach(link => {
          const liSub = document.createElement("li");
          liSub.className = "menu__mdd-internal-item menu__mdd-internal-item--sub menu__mdd-internal-item--sub-1 nav-item dropdown";
  
          const aSub = document.createElement("a");
          aSub.className = "menu__mdd-internal-link nav-link dropdown-item";
          aSub.href = link.link;
          aSub.textContent = link.title;
  
          liSub.appendChild(aSub);
          ulSub.appendChild(liSub);
        });
  
        li.appendChild(ulSub);
        ulRight.appendChild(li);
      });
    }
  
    // Initial render
    renderRightMenu(Object.keys(grouped)[0]);
  }
  