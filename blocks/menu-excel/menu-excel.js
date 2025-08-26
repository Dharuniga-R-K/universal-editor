import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const rawPath = block.querySelector("a")?.getAttribute("href");
  if (!rawPath) return;

  const fetchUrl = new URL(rawPath, window.location.origin).href;
  const response = await fetch(fetchUrl);
  const json = await response.json();
  const data = json.data;

  const grouped = {};
  data.forEach(item => {
    const main = item["main-menu"];
    const sub = item["sub-menu"];
    const menuItem = { title: item.menu, link: item.link };

    if (!grouped[main]) grouped[main] = {};
    if (!grouped[main][sub]) grouped[main][sub] = [];
    grouped[main][sub].push(menuItem);
  });

  const mainMenus = Object.keys(grouped);
  let selectedMain = mainMenus[0];

  await renderBlock(block, {
    mainMenus,
    selectedMain,
  });

  const mainMenuWrapper = block.querySelector('.main-menu-wrapper');
  const dropdown = mainMenuWrapper.querySelector('.main-menu-dropdown');
  const submenuWrapper = block.querySelector('.submenu-wrapper');

  // Populate main menu items
  dropdown.innerHTML = mainMenus.map(menu => `
    <li data-fly-menu-item="${menu}">${menu}</li>
  `).join('');

  // Toggle main menu dropdown
  mainMenuWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'block';
    mainMenuWrapper.querySelector('.main-menu-arrow').textContent = isVisible ? '▶' : '▼';
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
    mainMenuWrapper.querySelector('.main-menu-arrow').textContent = '▶';
  });

  // Main menu selection logic
  dropdown.querySelectorAll('li[data-fly-menu-item]').forEach(li => {
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedMain = li.textContent;
      mainMenuWrapper.querySelector('.label').textContent = selectedMain;
      renderSubmenus(grouped[selectedMain]);
      dropdown.style.display = 'none';
      mainMenuWrapper.querySelector('.main-menu-arrow').textContent = '▶';
    });
  });

  // Initial render
  renderSubmenus(grouped[selectedMain]);

  function renderSubmenus(submenuGroup) {
  submenuWrapper.innerHTML = Object.entries(submenuGroup).map(([subTitle, items]) => {
    const hasDropdown = items[0].title != '';

    return `
      <div class="submenu-column">
        <a class="submenu-title" href="${items[0].link}" target="_blank">
          ${subTitle}
        </a>
        ${hasDropdown ? `
          <span class="dropdown-arrow">▼</span>
          <ul class="submenu-dropdown">
            ${items.map(item => `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `;
  }).join('');
}

}
