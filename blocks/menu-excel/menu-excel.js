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
      mainMenuWrapper.innerHTML = '';
      Object.keys(grouped).forEach(mainMenu => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = mainMenu;
        btn.classList.toggle('active', mainMenu === selectedMainMenu);

        const arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.innerHTML = '&#9656;'; // ► arrow symbol
        btn.appendChild(arrow);

        btn.addEventListener('click', () => {
          selectedMainMenu = mainMenu;
          renderMainMenu();
          renderSubMenu();
        });

        mainMenuWrapper.appendChild(btn);
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
