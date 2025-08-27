import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  if (!rawPath) return;
  
  const data = await (await fetch(new URL(rawPath, window.location.origin))).json().then(r => r.data);
  const grouped = {};

  data.forEach(item => {
    const main = item['main-menu'], sub = item['sub-menu'];
    if (!grouped[main]) grouped[main] = {};
    if (!grouped[main][sub]) {
      grouped[main][sub] = [];
      grouped[main][sub].link1 = item.link1;
    }
    grouped[main][sub].push({ title: item.menu, link: item.link });
  });

  const mainMenus = Object.keys(grouped), submenuWrapper = block.querySelector('.submenu-wrapper');
  let selectedMain = mainMenus[0];

  async function renderMain() {
    await renderBlock(block, { mainMenus, selectedMain });
    bindInteractions();
  }

  function bindInteractions() {
    const menuWrapper = block.querySelector('.main-menu-wrapper');
    const dropdown = menuWrapper.querySelector('.main-menu-dropdown');

    // Toggle dropdown
    menuWrapper.addEventListener('click', e => {
      e.stopPropagation();
      const open = dropdown.style.display === 'block';
      dropdown.style.display = open ? 'none' : 'block';
      menuWrapper.querySelector('.main-menu-arrow').textContent = open ? '▶' : '▼';
    });

    // Close dropdown on outside click
    document.body.addEventListener('click', () => {
      dropdown.style.display = 'none';
      menuWrapper.querySelector('.main-menu-arrow').textContent = '▶';
    });

    // Main menu selection
    dropdown.querySelectorAll('li[data-fly-menu-item]').forEach(li => {
      li.onclick = e => {
        e.stopPropagation();
        selectedMain = li.textContent;
        renderMain();
        renderSubmenus();
        dropdown.style.display = 'none';
      };
    });
  }

  function renderSubmenus() {
    submenuWrapper.innerHTML = ''; // clear existing
    const template = block.querySelector('.submenu-column.template');

    const subGroup = grouped[selectedMain];
    Object.entries(subGroup).forEach(([title, items]) => {
      const clone = template.cloneNode(true);
      clone.classList.remove('template');
      clone.style.display = 'flex';

      const titleLink = clone.querySelector('.submenu-title');
      titleLink.textContent = title;
      titleLink.href = items.link1;

      const arrow = clone.querySelector('.dropdown-arrow');
      const ul = clone.querySelector('.submenu-dropdown');

      const hasDropdown = items.length > 1;
      if (hasDropdown) {
        ul.innerHTML = items.map(it => `<li><a href="${it.link}" target="_blank">${it.title}</a></li>`).join('');
      } else {
        arrow.remove();
        ul.remove();
      }

      submenuWrapper.appendChild(clone);
    });
  }

  await renderMain();
  renderSubmenus();
}
