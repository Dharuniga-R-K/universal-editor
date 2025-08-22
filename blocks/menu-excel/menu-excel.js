import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const menuJsonPath = block.dataset.menuPath || '/menu.json';

  // Fetch menu data
  let menuData = [];
  try {
    const response = await fetch(menuJsonPath);
    menuData = await response.json();
  } catch (e) {
    console.error('Failed to load menu JSON:', e);
  }

  // Render the block with faintly template
  await renderBlock(block, {
    test: () => true, // always true to render template as is
  });

  // Now dynamically build and insert menu items into main menu dropdown
  const menuDropdown = block.querySelector('.main-menu-dropdown');
  const submenuWrapper = block.querySelector('.submenu-wrapper');
  const mainMenuLabel = block.querySelector('.main-menu-button .label');

  menuDropdown.innerHTML = ''; // clear any existing

  (menuData.data || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.label;
    li.dataset.submenu = item.submenu ? JSON.stringify(item.submenu) : null;
    menuDropdown.appendChild(li);
  });

  // Initialize label
  mainMenuLabel.textContent = 'SELECT THE INDICATION';

  // Add click listeners to menu items
  menuDropdown.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      const submenuItems = li.dataset.submenu ? JSON.parse(li.dataset.submenu) : null;
      mainMenuLabel.textContent = li.textContent;
      submenuWrapper.innerHTML = ''; // clear previous submenu

      if (submenuItems && submenuItems.length) {
        const ul = document.createElement('ul');
        submenuItems.forEach(subItem => {
          const subLi = document.createElement('li');
          const a = document.createElement('a');
          a.href = subItem.url;
          a.textContent = subItem.label;
          subLi.appendChild(a);
          ul.appendChild(subLi);
        });
        submenuWrapper.appendChild(ul);
      }
    });
  });
}
