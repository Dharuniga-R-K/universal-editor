export default async function decorate(block) {
    // Get the spreadsheet path from the anchor
    const rawPath = block.querySelector("a")?.getAttribute("href");
    if (!rawPath) return;
  
    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const data = json.data;
  
    // Group rows by main-menu
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item['main-menu']]) grouped[item['main-menu']] = [];
      grouped[item['main-menu']].push(item);
    });
  
    const mainMenus = Object.keys(grouped);
    const defaultMain = mainMenus[0];
    const defaultSubItems = grouped[defaultMain];
  
    block.innerHTML = ''; // Clear existing
  
    const headerBottom = document.createElement('div');
    headerBottom.className = 'header__bottom';
  
    // === Left Section ===
    const leftSec = document.createElement('section');
    leftSec.className = 'row region region-header-bottom-left';
  
    const navInd = document.createElement('nav');
    navInd.className = 'menu__indications menu--indications';
    navInd.setAttribute('aria-label', 'select the Indication');
    navInd.setAttribute('role', 'navigation');
  
    const titleDiv = document.createElement('div');
    titleDiv.className = 'indications-menu-title-prefix';
    titleDiv.innerHTML = `
      <span class="indications-menu-title text-small">select the Indication</span>
      <span class="indications-menu-sub-title text-regular header__headline">
        <span class="mobile-link" data-url="${defaultSubItems[0].link}">${defaultMain}</span>
      </span>
      <i class="dropdown-button" tabindex="0"></i>
    `;
  
    const ulInd = document.createElement('ul');
    ulInd.className = 'menu__indications nav clearfix';
    mainMenus.forEach((menu) => {
      const li = document.createElement('li');
      li.className = 'menu__indications-item nav-item';
      const a = document.createElement('a');
      a.href = grouped[menu][0].link;
      a.className = 'menu__indications-link nav-link';
      a.textContent = menu;
      li.append(a);
      ulInd.append(li);
    });
  
    navInd.append(titleDiv, ulInd);
    leftSec.append(navInd);
    headerBottom.append(leftSec);
  
    // === Right Section ===
    const rightSec = document.createElement('section');
    rightSec.className = 'row region region-header-bottom-right';
  
    const navSub = document.createElement('nav');
    navSub.className = 'menu__mdd-internal navigation menu--mdd-internal';
    navSub.setAttribute('aria-label', 'MDD Menu');
    navSub.setAttribute('role', 'navigation');
  
    const ulMain = document.createElement('ul');
    ulMain.className = 'menu__mdd-internal nav clearfix';
  
    defaultSubItems.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'menu__mdd-internal-item menu__mdd-internal-item--with-sub menu__mdd-internal-item--dropdown nav-item dropdown';
  
      const a = document.createElement('a');
      a.href = item.link;
      a.className = 'menu__mdd-internal-link nav-link dropdown-toggle-item';
      a.innerHTML = `<span>${item.menu}</span>`;
  
      const ulSub = document.createElement('ul');
      ulSub.className = 'menu__mdd-internal menu__mdd-internal--sub menu__mdd-internal--sub-1 nav clearfix';
  
      const liSub = document.createElement('li');
      liSub.className = 'menu__mdd-internal-item menu__mdd-internal-item--sub menu__mdd-internal-item--sub-1 nav-item dropdown';
  
      const aSub = document.createElement('a');
      aSub.href = item.link;
      aSub.className = 'menu__mdd-internal-link nav-link dropdown-item';
      aSub.textContent = item.submenu;
  
      liSub.append(aSub);
      ulSub.append(liSub);
      li.append(a, ulSub);
      ulMain.append(li);
    });
  
    navSub.append(ulMain);
    rightSec.append(navSub);
    headerBottom.append(rightSec);
    block.append(headerBottom);
  
    // === Interactions ===
  
    // Toggle Indications Dropdown
    const dropdownBtn = block.querySelector('.dropdown-button');
    const indicationsList = block.querySelector('.menu__indications');
  
    dropdownBtn?.addEventListener('click', () => {
      indicationsList.classList.toggle('open');
      dropdownBtn.classList.toggle('open');
    });
  
    // Toggle submenus on click
    block.querySelectorAll('.menu__mdd-internal-item--with-sub').forEach((item) => {
      const toggle = item.querySelector('.dropdown-toggle-item');
  
      toggle?.addEventListener('click', (e) => {
        e.preventDefault();
  
        // Close other open submenus
        block.querySelectorAll('.menu__mdd-internal-item--with-sub').forEach((el) => {
          if (el !== item) el.classList.remove('open');
        });
  
        item.classList.toggle('open');
      });
  
      // Hover support (optional)
      item.addEventListener('mouseenter', () => item.classList.add('hover'));
      item.addEventListener('mouseleave', () => item.classList.remove('hover'));
    });
  }
  