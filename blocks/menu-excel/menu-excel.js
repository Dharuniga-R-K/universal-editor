import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  if (!rawPath) {
    block.textContent = 'No data source found.';
    return;
  }

  try {
    const response = await fetch(rawPath);
    if (!response.ok) throw new Error('Network response not ok');
    const json = await response.json();
    const data = json.data || [];

    if (data.length === 0) {
      block.textContent = 'No menu data available.';
      return;
    }

    // Group by main-menu
    const grouped = {};
    data.forEach(item => {
      const main = item['main-menu'];
      if (!grouped[main]) grouped[main] = [];
      grouped[main].push(item);
    });

    // State for Faintly template
    let selectedMainMenu = Object.keys(grouped)[0];
    let dropdownOpen = false;

    // Group submenus for selected main menu
    function getSubmenuGrouped() {
      const items = grouped[selectedMainMenu];
      if (!items) return {};

      const submenuGrouped = {};
      items.forEach(item => {
        const sub = item['sub-menu'] || 'Other';
        if (!submenuGrouped[sub]) submenuGrouped[sub] = [];
        submenuGrouped[sub].push(item);
      });
      return submenuGrouped;
    }

    let submenuGrouped = getSubmenuGrouped();

    // Functions to handle menu selection and toggle
    function selectMenu(menu) {
      selectedMainMenu = menu;
      dropdownOpen = false;
      submenuGrouped = getSubmenuGrouped();
      render();
    }

    function toggleDropdown() {
      dropdownOpen = !dropdownOpen;
      render();
    }

    function handleKeyDown(e, menu) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectMenu(menu);
      }
    }

    // Initial render
    function render() {
      renderBlock(block, {
        mainMenus: Object.keys(grouped),
        selectedMainMenu,
        submenuGrouped,
        dropdownOpen,
        selectMenu,
        toggleDropdown,
        handleKeyDown,
      });
    }

    render();

    // Close dropdown on click outside
    document.body.addEventListener('click', () => {
      if (dropdownOpen) {
        dropdownOpen = false;
        render();
      }
    });

  } catch (e) {
    block.textContent = 'Error loading menu data.';
    console.error(e);
  }
}
