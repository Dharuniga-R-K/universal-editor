import { renderBlock } from '../../scripts/faintly.js';



export default async function decorate(block) {

  const anchor = block.querySelector('a[href$=".json"]');

  const rawPath = anchor?.getAttribute('href');



  if (!rawPath) {

    console.warn('No JSON path found in block.');

    return;

  }



  const fetchUrl = new URL(rawPath, window.location.origin).href;

  const response = await fetch(fetchUrl);

  const json = await response.json();

  const data = json.data;



  // Group data by main-menu

  const grouped = {};

  data.forEach(item => {

    const main = item['main-menu'];

    if (!grouped[main]) grouped[main] = [];

    grouped[main].push(item);

  });



  const mainMenus = Object.keys(grouped);

  let selectedMain = mainMenus[0];



  await renderBlock(block, {

    selectedMain,

    grouped,

    test: (context) => Object.keys(context.grouped).length > 0,

    render: (context) => {

      const { grouped, selectedMain } = context;



      const wrapper = document.createElement('div');

      wrapper.className = 'menu-block';



      // === MAIN MENU ===

      const mainMenuWrapper = document.createElement('div');

      mainMenuWrapper.className = 'main-menu-wrapper';



      const selectLabel = document.createElement('span');

      selectLabel.textContent = 'SELECT THE INDICATION';



      const mainMenuButton = document.createElement('div');

      mainMenuButton.className = 'main-menu-button';



      const label = document.createElement('span');

      label.className = 'label';

      label.textContent = selectedMain;



      const arrow = document.createElement('span');

      arrow.className = 'main-menu-arrow';

      arrow.textContent = '▶';



      mainMenuButton.append(label, arrow);



      const dropdown = document.createElement('ul');

      dropdown.className = 'main-menu-dropdown';

      dropdown.style.display = 'none';



      mainMenus.forEach(menu => {

        const li = document.createElement('li');

        li.textContent = menu;

        li.addEventListener('click', (e) => {

          e.stopPropagation();

          label.textContent = menu;

          arrow.textContent = '▶';

          dropdown.style.display = 'none';

          context.selectedMain = menu;

          submenuWrapper.replaceChildren(renderSubmenus(context));

        });

        dropdown.appendChild(li);

      });



      mainMenuButton.addEventListener('click', (e) => {

        e.stopPropagation();

        const isVisible = dropdown.style.display === 'block';

        dropdown.style.display = isVisible ? 'none' : 'block';

        arrow.textContent = isVisible ? '▶' : '▼';

      });



      mainMenuWrapper.append(selectLabel, mainMenuButton, dropdown);



      // === SUBMENU ===

      const submenuWrapper = document.createElement('div');

      submenuWrapper.className = 'submenu-wrapper';

      submenuWrapper.append(...renderSubmenus(context));



      wrapper.append(mainMenuWrapper, submenuWrapper);

      return wrapper;

    },

  });

}



// === Submenu rendering ===

function renderSubmenus(context) {

  const { grouped, selectedMain } = context;



  const submenuMap = {};

  const submenuLinks = {};



  grouped[selectedMain].forEach(row => {

    const sub = row['sub-menu'];

    if (!submenuMap[sub]) submenuMap[sub] = [];

    submenuMap[sub].push({ title: row.menu, link: row.link });

    if (!submenuLinks[sub]) submenuLinks[sub] = row.link1 || row.link;

  });



  return Object.entries(submenuMap).map(([submenu, items]) => {

    const col = document.createElement('div');

    col.className = 'submenu-column';



    const title = document.createElement('a');

    title.className = 'submenu-title';

    title.textContent = submenu;

    title.href = submenuLinks[submenu] || '#';

    title.target = '_blank';

    col.append(title);



    const hasValidItems = items.some(item => item.title && item.title.trim() !== '');

    if (hasValidItems) {

      const arrow = document.createElement('div');

      arrow.className = 'submenu-arrow';

      arrow.textContent = '▼';

      col.append(arrow);

    }



    const list = document.createElement('ul');

    items.forEach(item => {

      const li = document.createElement('li');

      const a = document.createElement('a');

      a.href = item.link;

      a.textContent = item.title;

      a.target = '_blank';

      li.appendChild(a);

      list.appendChild(li);

    });



    col.append(list);

    return col;

  });

}

