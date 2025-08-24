export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  if (!rawPath) {
    block.textContent = "No data source found.";
    return;
  }

  try {
    const response = await fetch(rawPath);
    if (!response.ok) throw new Error('Network response not ok');
    const json = await response.json();
    const data = json.data || [];

    if (data.length === 0) {
      block.textContent = "No menu data available.";
      return;
    }

    // Group by main-menu
    const grouped = {};
    data.forEach(item => {
      const main = item["main-menu"];
      if (!grouped[main]) grouped[main] = [];
      grouped[main].push(item);
    });

    // Clear block and insert menu structure
    block.innerHTML = '';

    const menuExcel = document.createElement('div');
    menuExcel.className = 'menu-excel block';

    const mainMenuWrapper = document.createElement('nav');
    mainMenuWrapper.className = 'main-menu-wrapper';
    mainMenuWrapper.setAttribute('aria-label', 'Main menu');

    const submenuWrapper = document.createElement('div');
    submenuWrapper.className = 'submenu-wrapper';
    submenuWrapper.setAttribute('aria-label', 'Submenu');

    menuExcel.appendChild(mainMenuWrapper);
    menuExcel.appendChild(submenuWrapper);
    block.appendChild(menuExcel);

    let selectedMainMenu = Object.keys(grouped)[0];

    function renderMainMenu() {
  const mainMenuButton = block.querySelector('#main-menu-button');
  const dropdown = block.querySelector('#main-menu-dropdown');

  const mainMenus = Object.keys(grouped);
  if (mainMenus.length === 0) return;

  // Set the button label to the selected main menu
  mainMenuButton.querySelector('.label').textContent = selectedMainMenu;
  mainMenuButton.setAttribute('aria-expanded', 'false');

  // Clear previous dropdown items
  dropdown.innerHTML = '';

  // Populate dropdown with all main menus EXCEPT the selected one
  mainMenus.forEach(menu => {
    if (menu === selectedMainMenu) return; // skip selected menu

    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.textContent = menu;
    li.tabIndex = 0;

    li.addEventListener('click', () => {
      selectedMainMenu = menu;
      renderMainMenu();
      renderSubMenu();
      dropdown.style.display = 'none';
      mainMenuButton.setAttribute('aria-expanded', 'false');
    });

    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        li.click();
      }
    });

    dropdown.appendChild(li);
  });

  // Toggle dropdown on button click
  mainMenuButton.onclick = (e) => {
    e.stopPropagation();
    const isOpen = dropdown.style.display === 'block';
    dropdown.style.display = isOpen ? 'none' : 'block';
    mainMenuButton.setAttribute('aria-expanded', !isOpen);
    mainMenuButton.querySelector('.arrow').textContent = isOpen ? '▶' : '▼';
  };

  // Close dropdown on clicking outside
  document.body.addEventListener('click', () => {
    dropdown.style.display = 'none';
    mainMenuButton.setAttribute('aria-expanded', 'false');
    mainMenuButton.querySelector('.arrow').textContent = '▶';
  });
}

    function renderSubMenu() {
      submenuWrapper.innerHTML = '';

      const items = grouped[selectedMainMenu];
      if (!items) return;

      // Group by sub-menu
      const submenuGrouped = {};
      items.forEach(item => {
        const sub = item['sub-menu'] || 'Other';
        if (!submenuGrouped[sub]) submenuGrouped[sub] = [];
        submenuGrouped[sub].push(item);
      });

      Object.entries(submenuGrouped).forEach(([subMenu, items]) => {
        const col = document.createElement('div');
        col.className = 'submenu-column';

        const title = document.createElement('div');
        title.className = 'submenu-title';
        title.textContent = subMenu;

        // Add dropdown arrow to title
        const dropdownArrow = document.createElement('span');
        dropdownArrow.className = 'dropdown-arrow';
        dropdownArrow.innerHTML = '&#9660;'; // ▼
        title.appendChild(dropdownArrow);

        col.appendChild(title);

        // Submenu dropdown list (hidden by default, shows on hover)
        const ul = document.createElement('ul');
        ul.className = 'submenu-list';

        items.forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.link1 || item.link;
          a.textContent = item.menu;
          a.target = '_blank';
          li.appendChild(a);
          ul.appendChild(li);
        });

        col.appendChild(ul);
        submenuWrapper.appendChild(col);
      });
    }

    renderMainMenu();
    renderSubMenu();

  } catch (e) {
    block.textContent = "Error loading menu data.";
    console.error(e);
  }
}
