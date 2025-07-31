export default function decorate(block) {
    // Add class to hide original content
    block.classList.add('menu-original-hidden');
  
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    const submenuItems = divs.slice(1).map((div) => {
      const label = div.querySelector('p')?.textContent.trim();
      const link = div.querySelector('a')?.href;
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);
  
    // Create new dropdown structure
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
  
    dropdownWrapper.appendChild(dropdownTitle);
    dropdownWrapper.appendChild(dropdownArrow);
    dropdownWrapper.appendChild(dropdownContent);
  
    // Append dropdown UI after the hidden block
    block.appendChild(dropdownWrapper);
  }
  