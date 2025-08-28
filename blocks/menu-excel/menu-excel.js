import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const raw = block.querySelector('a')?.getAttribute('href');
  if (!raw) return;

  const data = await fetch(new URL(raw, window.location.origin)).then((r) => r.json()).then((j) => j.data);
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

  const mainMenus = Object.keys(grouped);
  let selectedMain = mainMenus[0];

  async function onRender() {
    await renderBlock(block, { mainMenus, selectedMain });
    bindMenuEvents();
    renderSubmenus();
  }

  function bindMenuEvents() {
    const menuWrap = block.querySelector('.main-menu-wrapper');
    const dropdown = menuWrap.querySelector('.main-menu-dropdown');

    menuWrap.onclick = e => {
      e.stopPropagation();
      const isOpen = dropdown.style.display === 'block';
      dropdown.style.display = isOpen ? 'none' : 'block';
      menuWrap.querySelector('.main-menu-arrow').textContent = isOpen ? '▶' : '▼';
    };

    document.body.onclick = () => {
      dropdown.style.display = 'none';
      menuWrap.querySelector('.main-menu-arrow').textContent = '▶';
    };

    dropdown.querySelectorAll('li[data-fly-menu-item]').forEach(li => {
      li.onclick = e => {
        e.stopPropagation();
        selectedMain = li.textContent;
        onRender();
      };
    });
  }

  function renderSubmenus() {
    const wrapper = block.querySelector('.submenu-wrapper');
    wrapper.innerHTML = '';
    const tpl = wrapper.querySelector('.submenu-column.template');

    Object.entries(grouped[selectedMain]).forEach(([title, items]) => {
      const clone = tpl.cloneNode(true);
      clone.classList.remove('template');
      clone.style.display = '';

      const titleLink = clone.querySelector('.submenu-title');
      titleLink.textContent = title;
      titleLink.href = items.link1;

      const arrow = clone.querySelector('.dropdown-arrow');
      const ul = clone.querySelector('.submenu-dropdown');

      const subItems = items.slice();
      if (subItems.length > 1) {
        ul.innerHTML = subItems.map(i => `<li><a href="${i.link}" target="_blank">${i.title}</a></li>`).join('');
      } else {
        arrow.remove();
        ul.remove();
      }

      wrapper.appendChild(clone);
    });
  }

  await onRender();
}
