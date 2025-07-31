export default function decorate(block) {
    // Skip if no children
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    // Extract menu title
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    // Collect sub-menu items
    const submenuItems = divs.slice(1).map((div) => {
      const label = div.querySelector('p')?.textContent.trim();
      const link = div.querySelector('a')?.href;
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);
  
    // === DO NOT REMOVE EXISTING CONTENT ===
    block.classList.add('menu-block-hidden'); // Just hide from view, not from DOM
  
    // Create dropdown container
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'dropdown-container';
  
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
  
    dropdownWrapper.appendChild(dropdownTitle);
    dropdownWrapper.appendChild(dropdownArrow);
    dropdownWrapper.appendChild(dropdownContent);
  
    // Append visual dropdown above actual content
    block.parentElement.insertBefore(dropdownWrapper, block);
  
    // Hover interaction
    dropdownWrapper.addEventListener('mouseenter', () => {
      dropdownContent.classList.add('open');
    });
    dropdownWrapper.addEventListener('mouseleave', () => {
      dropdownContent.classList.remove('open');
    });
  }
  