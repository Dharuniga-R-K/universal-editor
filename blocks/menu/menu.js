export default function decorate(block) {
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    // Extract main menu title
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    // Collect submenu items from other divs
    const submenuItems = divs.slice(1).map(div => {
      const label = div.querySelector('div > p')?.textContent.trim();
      const aTag = div.querySelector('a');
      const link = aTag ? aTag.href : '#';
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);
  
    // Hide original content but keep in DOM for authoring
    block.style.position = 'relative';
    block.style.zIndex = 0;
    block.style.opacity = '0'; // or visibility:hidden etc.
  
    // Create container that will hold all menu titles horizontally
    const menuTitlesContainer = document.createElement('div');
    menuTitlesContainer.className = 'menu-titles-container';
  
    // Create one title + dropdown for current block
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
  
    // Append this dropdown inside the menuTitlesContainer
    menuTitlesContainer.appendChild(dropdownWrapper);
  
    // Add menuTitlesContainer before the original block
    block.parentElement.insertBefore(menuTitlesContainer, block);
  
    // Show dropdown on hover
    dropdownWrapper.addEventListener('mouseenter', () => {
      dropdownContent.style.display = 'block';
    });
    dropdownWrapper.addEventListener('mouseleave', () => {
      dropdownContent.style.display = 'none';
    });
  
    dropdownContent.style.display = 'none';
  }
  