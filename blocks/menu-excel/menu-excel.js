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
    submenuWrapper.innerHTML = Object.entries(submenuGroup).map(([subTitle, items]) => `
      <div class="submenu-group">
        <a class="submenu-title" href="${items[0].link}" target="_blank">${subTitle}</a>
        <ul>
          ${items.map(item => `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`).join('')}
        </ul>
      </div>
    `).join('');
    submenuWrapper.querySelectorAll('.submenu-group').forEach(group => {
      const title = group.querySelector('.submenu-title');
      const dropdown = group.querySelector('.submenu-dropdown');

      title.addEventListener('mouseenter', () => {
        dropdown.style.display = 'block';
      });

      title.addEventListener('mouseleave', () => {
        dropdown.style.display = 'none';
      });

      // Optional: Keep the dropdown open if the mouse is over the dropdown
      dropdown.addEventListener('mouseenter', () => {
        dropdown.style.display = 'block';
      });

      dropdown.addEventListener('mouseleave', () => {
        dropdown.style.display = 'none';
      });
    });
  
  }
}
