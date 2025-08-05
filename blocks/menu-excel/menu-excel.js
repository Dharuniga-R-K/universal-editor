export default async function decorate(block) {
    const rawPath = block.querySelector("a")?.getAttribute("href");
    if (!rawPath) return;
  
    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const data = json.data || [];
  
    const grouped = {};
    data.forEach(item => {
      const main = item['main-menu'];
      if (!grouped[main]) grouped[main] = [];
      grouped[main].push(item);
    });
  
    const mainMenus = Object.keys(grouped);
    const selectedMain = mainMenus[0];
    const subItems = grouped[selectedMain];
  
    block.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'header__bottom';
  
    // Left section
    const left = document.createElement('section');
    left.className = 'row region region-header-bottom-left';
  
    const navLeft = document.createElement('nav');
    navLeft.className = 'menu__indications menu--indications';
    navLeft.setAttribute('aria-label', 'select the Indication');
    navLeft.setAttribute('role', 'navigation');
  
    const titleDiv = document.createElement('div');
    titleDiv.className = 'indications-menu-title-prefix';
    titleDiv.innerHTML = `
      <span class="indications-menu-title text-small">select the Indication</span>
      <span class="indications-menu-sub-title text-regular header__headline">
        <span class="mobile-link" data-url="${subItems[0].link}">${selectedMain}</span>
      </span>
      <i class="dropdown-button" tabindex="0"></i>
    `;
  
    const ulInd = document.createElement('ul');
    ulInd.className = 'menu__indications nav clearfix';
    mainMenus.forEach(menu => {
      const li = document.createElement('li');
      li.className = 'menu__indications-item nav-item';
      const a = document.createElement('a');
      a.href = grouped[menu][0].link;
      a.className = 'menu__indications-link nav-link';
      a.textContent = menu;
      li.append(a);
      ulInd.append(li);
    });
  
    navLeft.append(titleDiv, ulInd);
    left.append(navLeft);
    header.append(left);
  
    // Right section
    const right = document.createElement('section');
    right.className = 'row region region-header-bottom-right';
  
    const navRight = document.createElement('nav');
    navRight.className = 'menu__mdd-internal navigation menu--mdd-internal';
    navRight.setAttribute('aria-label', 'MDD Menu');
    navRight.setAttribute('role', 'navigation');
  
    const ulRight = document.createElement('ul');
    ulRight.className = 'menu__mdd-internal nav clearfix';
  
    subItems.forEach(item => {
      const li = document.createElement('li');
      li.className = 'menu__mdd-internal-item menu__mdd-internal-item--with-sub menu__mdd-internal-item--dropdown nav-item dropdown';
  
      const aMain = document.createElement('a');
      aMain.href = item.link;
      aMain.className = 'menu__mdd-internal-link nav-link dropdown-toggle-item';
      aMain.innerHTML = `<span>${item['sub-menu']}</span>`;
  
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
      li.append(aMain, ulSub);
      ulRight.append(li);
    });
  
    navRight.append(ulRight);
    right.append(navRight);
    header.append(right);
  
    block.append(header);
  
    // Interaction JS
    const dropdownBtn = block.querySelector('.dropdown-button');
    dropdownBtn?.addEventListener('click', () => {
      block.querySelector('.menu__indications')?.classList.toggle('open');
      dropdownBtn.classList.toggle('open');
    });
  
    block.querySelectorAll('.menu__mdd-internal-item--with-sub').forEach(item => {
      const toggle = item.querySelector('.dropdown-toggle-item');
      toggle?.addEventListener('click', e => {
        e.preventDefault();
        block.querySelectorAll('.menu__mdd-internal-item--with-sub').forEach(el => {
          if (el !== item) el.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    });
  }
  