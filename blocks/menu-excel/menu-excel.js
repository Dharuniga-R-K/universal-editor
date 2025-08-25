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

    if (!grouped[main]) grouped[main] = {};
    if (!grouped[main][sub]) grouped[main][sub] = [];

    grouped[main][sub].push({
      title: item.menu,
      link: item.link,
    });
  });

  const mainMenus = Object.keys(grouped);
  let selectedMain = mainMenus[0];

  await renderBlock(block, {
    mainMenus,
    selectedMain,
    submenus: grouped[selectedMain],
  });

  const mainMenuButton = block.querySelector('.main-menu-wrapper');
  const dropdown = block.querySelector('.main-menu-dropdown');
  const submenuWrapper = block.querySelector('.submenu-wrapper');

  mainMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdown.style.display === "block";
    dropdown.style.display = isVisible ? "none" : "block";
    mainMenuButton.querySelector('.main-menu-arrow').textContent = isVisible ? "▶" : "▼";
  });

  dropdown.querySelectorAll('[data-fly-menu-item]').forEach(menuItem => {
    menuItem.addEventListener('click', async (e) => {
      e.stopPropagation();
      selectedMain = e.target.innerText;
      mainMenuButton.querySelector('.label').textContent = selectedMain;
      dropdown.style.display = "none";
      mainMenuButton.querySelector('.main-menu-arrow').textContent = "▶";

      // Re-render block with updated submenus
      await renderBlock(block, {
        mainMenus,
        selectedMain,
        submenus: grouped[selectedMain],
      });
    });
  });

  document.body.addEventListener('click', () => {
    dropdown.style.display = 'none';
    mainMenuButton.querySelector('.main-menu-arrow').textContent = '▶';
  });
}
