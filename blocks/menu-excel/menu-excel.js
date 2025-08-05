export default async function decorate(block) {
    const rawPath = block.querySelector("a")?.getAttribute("href");
    if (!rawPath) return;
  
    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const data = (await fetch(fetchUrl).then(r => r.json())).data;
  
    // Group rows by main‑menu
    const grouped = {};
    data.forEach(item => {
      (grouped[item['main-menu']] ||= []).push(item);
    });
  
    // Pick first main-menu (e.g. "Major Depressive Disorder")
    const mainLabels = Object.keys(grouped);
    const selectedMain = mainLabels[0];
    const subItems = grouped[selectedMain];
  
    block.innerHTML = '';
  
    const headerBottom = document.createElement('div');
    headerBottom.className = 'header__bottom';
  
    // Left section (Indications)
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
        <span class="mobile-link" data-url="${subItems[0]['link']}">${selectedMain}</span>
      </span>
      <i class="dropdown-button" tabindex="0"></i>
    `;
  
    const ulInd = document.createElement('ul');
    ulInd.className = 'menu__indications nav clearfix';
    grouped[selectedMain].forEach(item => {
      // use nav items from each group key
      mainLabels.forEach(main => {
        grouped[main].forEach(sg => {
          const li = document.createElement('li');
          li.className = 'menu__indications-item nav-item';
          const a = document.createElement('a');
          a.href = sg.link;
          a.className = `${main.toLowerCase().replace(/\s+/g, '')} menu__indications-link nav-link`;
          a.textContent = sg['main-menu'];
          li.append(a);
          ulInd.append(li);
        });
      });
    });
  
    navInd.append(titleDiv, ulInd);
    leftSec.append(navInd);
    headerBottom.append(leftSec);
  
    // Right section (Submenu)
    const rightSec = document.createElement('section');
    rightSec.className = 'row region region-header-bottom-right';
  
    const navSub = document.createElement('nav');
    navSub.className = 'menu__mdd-internal navigation menu--mdd-internal';
    navSub.setAttribute('aria-label', 'MDD Menu');
    navSub.setAttribute('role', 'navigation');
  
    const ulMain = document.createElement('ul');
    ulMain.className = 'menu__mdd-internal nav clearfix';
  
    subItems.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'menu__mdd-internal-item menu__mdd-internal-item--with-sub menu__mdd-internal-item--dropdown nav-item dropdown';
      const a = document.createElement('a');
      a.href = item.link;
      a.className = 'menu__mdd-internal-link nav-link dropdown-toggle-item';
      a.innerHTML = item.menu;
      
      // nested submenu
      const ulSub = document.createElement('ul');
      ulSub.className = 'menu__mdd-internal menu__mdd-internal--sub menu__mdd-internal--sub-1 nav clearfix';
      const liSub = document.createElement('li');
      liSub.className = 'menu__mdd-internal-item menu__mdd-internal-item--sub menu__mdd-internal-item--sub-1 nav-item dropdown';
      const aSub = document.createElement('a');
      aSub.href = item.link;
      aSub.className = 'menu__mdd-internal-link nav-link dropdown-item';
      aSub.textContent = item.menu;
      liSub.append(aSub);
      ulSub.append(liSub);
      li.append(a); 
      li.append(ulSub);
      ulMain.append(li);
    });
  
    navSub.append(ulMain);
    rightSec.append(navSub);
    headerBottom.append(rightSec);
  
    block.append(headerBottom);
  }
  