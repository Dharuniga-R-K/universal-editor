export default function decorate(block) {
    
    [...block.children].forEach((child) => {
      child.classList.add('menu-original-hidden');
    });
  
   
    const divs = [...block.querySelectorAll(':scope > div')];
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
    const submenuItems = divs.slice(1).map((div) => {
      const label = div.querySelector('div > p')?.textContent.trim();
      const link = div.querySelector('a')?.href;
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);
  
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'menu-enhanced-dropdown';
  
    const titleEl = document.createElement('div');
    titleEl.className = 'dropdown-title';
    titleEl.textContent = title;
  
    const arrowEl = document.createElement('div');
    arrowEl.className = 'dropdown-arrow';
    arrowEl.textContent = '▼';
  
    const contentEl = document.createElement('div');
    contentEl.className = 'dropdown-content';
  
    submenuItems.forEach(({ label, link }) => {
      const a = document.createElement('a');
      a.className = 'dropdown-item';
      a.href = link;
      a.textContent = label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      contentEl.appendChild(a);
    });
  
    dropdownWrapper.append(titleEl, arrowEl, contentEl);
    block.appendChild(dropdownWrapper);

    dropdownWrapper.addEventListener('mouseenter', () => {
      contentEl.classList.add('open');
    });

    dropdownWrapper.addEventListener('mouseleave', () => {
      contentEl.classList.remove('open');
    });
  }
  