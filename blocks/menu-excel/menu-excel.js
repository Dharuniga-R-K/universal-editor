import { renderBlock } from '../../scripts/faintly.js';

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
    if (!grouped[main]) grouped[main] = {};
    
    const sub = item["sub-menu"];
    if (!grouped[main][sub]) grouped[main][sub] = [];
    
    grouped[main][sub].push({
      title: item.menu,
      link: item.link,
    });
  });

  const mainMenus = Object.keys(grouped);
  let selectedMain = mainMenus[0];

  // Render block initially
  await renderBlock(block, {
    mainMenus,
    selectedMain,
    submenus: grouped[selectedMain],
  });

  const mainMenuButton = block.querySelector('.main-menu-wrapper');
  const dropdown = block.querySelector('.main-menu-dropdown');
  const submenuWrapper = block.querySelector('.submenu-wrapper');

  // Render main menu list dynamically
  dropdown.innerHTML = mainMenus.map(menu => `
    <li data-fly-menu-item="${menu}">${menu}</li>
  `).join('');

  // Dropdown toggle
  mainMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdown.style.display === "block";
    dropdown.style.display = isVisible ? "none" : "block";
    mainMenuButton.querySelector('.main-menu-arrow').textContent = isVisible ? "▶" : "▼";
  });

  // Handle main menu item click
  dropdown.querySelectorAll('[data-fly-menu-item]').forEach(menuItem => {
    menuItem.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedMain = e.target.innerText;
      mainMenuButton.querySelector('.label').textContent = selectedMain;
      dropdown.style.display = "none";
      mainMenuButton.querySelector('.main-menu-arrow').textContent = "▶";
      renderSubmenus(grouped[selectedMain]);
    });
  });

  // Initial submenu render
  renderSubmenus(grouped[selectedMain]);

  function renderSubmenus(submenuGroup) {
   submenuWrapper.innerHTML = submenus.map(submenu => `
  <div class="submenu-group">
    <div class="submenu-toggle">
      <span class="submenu-title">${submenu.title} <span class="submenu-arrow">▼</span></span>
      <ul class="submenu-dropdown">
        ${submenu.items.map(item => `
          <li><a href="${item.link}" target="_blank">${item.title}</a></li>
        `).join('')}
      </ul>
    </div>
  </div>
`).join('');
  }
}
