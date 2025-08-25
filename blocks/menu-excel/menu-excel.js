import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  if (!rawPath) {
    block.textContent = 'No data source found.';
    return;
  }

  try {
    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const data = json.data;

    // Group data by main-menu and sub-menu
    const grouped = {};
    data.forEach(item => {
      const main = item['main-menu'];
      const sub = item['sub-menu'];
      if (!grouped[main]) grouped[main] = {};
      if (!grouped[main][sub]) grouped[main][sub] = [];
      grouped[main][sub].push({
        title: item.menu,
        link: item.link,
      });
    });

    const mainMenus = Object.keys(grouped);
    let selectedMain = mainMenus[0];
    let submenus = grouped[selectedMain];

    // Render the block using Faintly
    await renderBlock(block, {
      mainMenus,
      selectedMain,
      submenus,
    });

    // DOM References
    const mainMenuWrapper = block.querySelector('.main-menu-wrapper');
    const dropdown = mainMenuWrapper.querySelector('.main-menu-dropdown');
    const label = mainMenuWrapper.querySelector('.label');
    const arrow = mainMenuWrapper.querySelector('.main-menu-arrow');
    const submenuWrapper = block.querySelector('.submenu-wrapper');

    // Toggle dropdown
    mainMenuWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block';
      arrow.textContent = isVisible ? '▶' : '▼';
    });

    // Handle selection of main menu
    dropdown.querySelectorAll('[data-fly-menu-item]').forEach(item => {
      item.addEventListener('click', async (e) => {
        e.stopPropagation();
        selectedMain = e.target.textContent;
        submenus = grouped[selectedMain];

        // Re-render block with new main menu selected
        await renderBlock(block, {
          mainMenus,
          selectedMain,
          submenus,
        });
      });
    });

    // Close dropdown if clicking outside
    document.body.addEventListener('click', () => {
      dropdown.style.display = 'none';
      arrow.textContent = '▶';
    });

  } catch (e) {
    block.textContent = 'Error loading menu.';
    console.error(e);
  }
}
