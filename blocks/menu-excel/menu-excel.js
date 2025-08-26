import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  if (!rawPath) return;

  const fetchUrl = new URL(rawPath, window.location.origin).href;
  const response = await fetch(fetchUrl);
  const json = await response.json();
  const data = json.data;

  const grouped = {};

  data.forEach(item => {
    const main = item['main-menu'];
    const sub = item['sub-menu'];
    const menuItem = { title: item.menu, link: item.link };

    if (!grouped[main]) grouped[main] = {};
    if (!grouped[main][sub]) {
      grouped[main][sub] = [];
      grouped[main][sub].link1 = item.link1;
    }

    grouped[main][sub].push(menuItem);
  });

  const mainMenus = Object.keys(grouped);
  let selectedMain = mainMenus[0];

  const renderAndBind = async () => {
    await renderBlock(block, {
      mainMenus,
      selectedMain,
      submenus: grouped[selectedMain],
    });

    const mainMenuWrapper = block.querySelector('.main-menu-wrapper');
    const dropdown = mainMenuWrapper.querySelector('.main-menu-dropdown');

    // Toggle dropdown
    mainMenuWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block';
      mainMenuWrapper.querySelector('.main-menu-arrow').textContent = isVisible ? '▶' : '▼';
    });

    // Close dropdown on click outside
    document.addEventListener('click', () => {
      dropdown.style.display = 'none';
      mainMenuWrapper.querySelector('.main-menu-arrow').textContent = '▶';
    });

    // Handle main menu selection
    dropdown.querySelectorAll('[data-fly-menu-item]').forEach(li => {
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedMain = li.textContent;
        renderAndBind(); // Rerender with updated submenu
      });
    });
  };

  await renderAndBind();
}
