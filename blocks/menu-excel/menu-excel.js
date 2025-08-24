import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  if (!rawPath) return;

  const fetchUrl = new URL(rawPath, window.location.origin).href;
  const response = await fetch(fetchUrl);
  const json = await response.json();
  const data = json.data;

  const grouped = {};
  const submenuLinks = {};

  data.forEach(row => {
    const main = row['main-menu'];
    const sub = row['sub-menu'];
    if (!grouped[main]) grouped[main] = {};
    if (!grouped[main][sub]) grouped[main][sub] = [];

    grouped[main][sub].push({
      title: row.menu,
      link: row.link,
    });

    submenuLinks[sub] = row.link1 || row.link;
  });

  const mainMenus = Object.keys(grouped);
  let selectedMain = mainMenus[0];
  let dropdownOpen = false;

  const selectMenu = (menu) => {
    selectedMain = menu;
    dropdownOpen = false;
    update();
  };

  const toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
    update();
  };

  const update = async () => {
    await renderBlock(block, {
      selectedMain,
      dropdownOpen,
      mainMenus,
      grouped,
      submenuLinks,
      selectMenu,
      toggleDropdown,
      menu: selectedMain.toLowerCase().replace(/\s+/g, '-'),
    });
  };

  block.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('main-menu-button') || target.closest('.main-menu-button')) {
      toggleDropdown();
    }
  });

  update();
}
