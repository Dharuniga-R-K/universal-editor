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

    // Group data by main-menu
    const grouped = {};
    data.forEach(item => {
      const main = item["main-menu"];
      if (!grouped[main]) grouped[main] = [];
      grouped[main].push(item);
    });

    block.innerHTML = '';

    // Create container for main menu (left) and submenu (right)
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';

    // Left: main menu list
    const mainMenuDiv = document.createElement('div');
    mainMenuDiv.style.flex = '1';
    mainMenuDiv.style.borderRight = '1px solid #ccc';

    // Right: submenu list for selected main menu
    const submenuDiv = document.createElement('div');
    submenuDiv.style.flex = '2';
    submenuDiv.style.paddingLeft = '1rem';

    let selectedMainMenu = Object.keys(grouped)[0];

    function renderMainMenu() {
      mainMenuDiv.innerHTML = '';
      Object.keys(grouped).forEach(mainMenu => {
        const btn = document.createElement('button');
        btn.textContent = mainMenu;
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.marginBottom = '0.5rem';
        btn.style.textAlign = 'left';
        btn.style.background = mainMenu === selectedMainMenu ? '#07412c' : 'transparent';
        btn.style.color = mainMenu === selectedMainMenu ? 'white' : 'black';
        btn.style.border = 'none';
        btn.style.padding = '0.5rem';
        btn.style.cursor = 'pointer';

        btn.addEventListener('click', () => {
          selectedMainMenu = mainMenu;
          renderMainMenu();
          renderSubMenu();
        });

        mainMenuDiv.appendChild(btn);
      });
    }

    function renderSubMenu() {
      submenuDiv.innerHTML = '';
      const items = grouped[selectedMainMenu];
      
      // Group by sub-menu
      const submenuGrouped = {};
      items.forEach(item => {
        const sub = item['sub-menu'] || 'Other';
        if (!submenuGrouped[sub]) submenuGrouped[sub] = [];
        submenuGrouped[sub].push(item);
      });

      Object.entries(submenuGrouped).forEach(([subMenu, items]) => {
        const subMenuTitle = document.createElement('h3');
        subMenuTitle.textContent = subMenu;
        submenuDiv.appendChild(subMenuTitle);

        const ul = document.createElement('ul');
        items.forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.link1 || item.link;
          a.textContent = item.menu;
          a.target = '_blank';
          li.appendChild(a);
          ul.appendChild(li);
        });
        submenuDiv.appendChild(ul);
      });
    }

    container.appendChild(mainMenuDiv);
    container.appendChild(submenuDiv);
    block.appendChild(container);

    renderMainMenu();
    renderSubMenu();

  } catch (e) {
    block.textContent = "Error loading menu data.";
    console.error(e);
  }
}
