import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const jsonPath = block.querySelector("a")?.getAttribute("href");
  if (!jsonPath) return;

  console.log("Before renderBlock", jsonPath);

  await renderBlock(block, {
    jsonPath,
    test: (context) => Boolean(context.jsonPath),
  });

  console.log("After renderBlock");

  const fetchUrl = new URL(jsonPath, window.location.origin).href;
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

  const mainMenuWrapper = document.createElement("div");
  mainMenuWrapper.className = "main-menu-wrapper";

  const selectLabel = document.createElement("span");
  selectLabel.textContent = "SELECT THE INDICATION";

  const mainMenuButton = document.createElement("div");
  mainMenuButton.className = "main-menu-button";

  const mainMenus = Object.keys(grouped);
  let selectedMain = mainMenus[0] || "";
  const labelSpan = document.createElement("span");
  labelSpan.className = "label";
  labelSpan.textContent = selectedMain;
  const arrowSpan = document.createElement("span");
  arrowSpan.className = "main-menu-arrow";
  arrowSpan.textContent = "▶";
  mainMenuButton.append(labelSpan, arrowSpan);

  const dropdown = document.createElement("ul");
  dropdown.className = "main-menu-dropdown";
  dropdown.style.display = "none";

  mainMenus.forEach(menu => {
    const li = document.createElement("li");
    li.textContent = menu;
    li.onclick = e => {
      e.stopPropagation();
      selectedMain = menu;
      labelSpan.textContent = menu;
      dropdown.style.display = "none";
      arrowSpan.textContent = "▶";
      renderSubmenus();
    };
    dropdown.appendChild(li);
  });

  mainMenuButton.addEventListener("click", e => {
    e.stopPropagation();
    const isVisible = dropdown.style.display === "block";
    dropdown.style.display = isVisible ? "none" : "block";
    arrowSpan.textContent = isVisible ? "▶" : "▼";
  });

  mainMenuWrapper.append(selectLabel, mainMenuButton, dropdown);
  block.appendChild(mainMenuWrapper);

  const submenuWrapper = document.createElement("div");
  submenuWrapper.className = "submenu-wrapper";
  block.appendChild(submenuWrapper);

  function renderSubmenus() {
    submenuWrapper.innerHTML = "";
    const rows = grouped[selectedMain] || [];

    const submenuMap = {};
    const submenuLinks = {};

    rows.forEach(row => {
      const sub = row["sub-menu"];
      if (!submenuMap[sub]) submenuMap[sub] = [];
      submenuMap[sub].push({ title: row.menu, link: row.link });

      if (!submenuLinks[sub]) submenuLinks[sub] = row.link1 || row.link;
    });

    Object.entries(submenuMap).forEach(([submenu, items]) => {
      const col = document.createElement("div");
      col.className = "submenu-column";

      const title = document.createElement("a");
      title.className = "submenu-title";
      title.textContent = submenu;
      title.href = submenuLinks[submenu] || "#";
      title.target = "_blank";
      title.style.cursor = "pointer";
      col.append(title);

      const hasValidItems = items.some(item => item.title?.trim() !== "");
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
