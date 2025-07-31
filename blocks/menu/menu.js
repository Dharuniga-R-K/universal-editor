export default function decorate(block) {
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    const submenuItems = divs.slice(1).map(div => {
      const label = div.querySelector('div > p')?.textContent.trim();
      const aTag = div.querySelector('a');
      const link = aTag ? aTag.href : '#';
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);
  
    // Hide original content but keep in DOM for authoring
    block.style.position = 'relative';
    block.style.zIndex = 0;
    block.style.opacity = '0'; // or use visibility: hidden; pointer-events: none;
  
    // Create visual dropdown container outside or above block content
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'dropdown-container';
    dropdownWrapper.style.position = 'relative';
    dropdownWrapper.style.zIndex = 10;
  
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
      a.className = 'dropdown-item';
      a.href = link;
      a.textContent = label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      dropdownContent.appendChild(a);
    });
  
    dropdownWrapper.appendChild(dropdownTitle);
    dropdownWrapper.appendChild(dropdownArrow);
    dropdownWrapper.appendChild(dropdownContent);
  
    block.parentElement.insertBefore(dropdownWrapper, block);
  
    dropdownWrapper.addEventListener('mouseenter', () => {
      dropdownContent.style.display = 'flex';
    });
  
    dropdownWrapper.addEventListener('mouseleave', () => {
      dropdownContent.style.display = 'none';
    });
  
    dropdownContent.style.display = 'none';
  }
  