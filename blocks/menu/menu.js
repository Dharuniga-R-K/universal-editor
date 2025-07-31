export default function decorate(block) {
    const originalInner = block.querySelector('.menu.block');
    if (originalInner) {
      originalInner.classList.add('menu-original-hidden');
    }
  
    const divs = [...block.querySelectorAll(':scope > .menu-original-hidden ~ div')];
    // If your structure differs, adjust the selector above
  
    // Extract title
    const title = divs[0]?.querySelector('p')?.textContent.trim() || 'Menu';
  
    const submenuItems = divs.slice(1).map((div) => {
      const label = div.querySelector('p')?.textContent.trim();
      const aTag = div.querySelector('a');
      const link = aTag?.href || '';
      return label && link ? { label, link } : null;
    }).filter(Boolean);
  
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'menu-enhanced-dropdown';
  
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    const dropdownArrow = document.createElement('div');
    dropdownArrow.className = 'dropdown-arrow';
    dropdownArrow.textContent = '▼';
  
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
  
    submenuItems.forEach(({ label, link }) => {
      const a = document.createElement('a');
      a.href = link;
      a.textContent = label;
      a.className = 'dropdown-item';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      dropdownContent.appendChild(a);
    });
  
    dropdownWrapper.append(dropdownTitle, dropdownArrow, dropdownContent);
    block.appendChild(dropdownWrapper);
  }
  