export default function decorate(block) {
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    // Get dropdown title (first div)
    const titleDiv = divs[0].querySelector('p');
    const title = titleDiv?.textContent.trim() || 'Menu';
  
    // Create container for dropdown
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    // Create the visible dropdown title
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    // Optional: Add a static downward arrow below the title
    const arrow = document.createElement('div');
    arrow.className = 'dropdown-arrow';
    arrow.textContent = '▼'; // Simple down arrow
  
    // Create dropdown content (list of submenus)
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
  
    // Loop through remaining divs for sub-menus
    divs.slice(1).forEach((subDiv) => {
      const label = subDiv.querySelector('p')?.textContent.trim();
      const link = subDiv.querySelector('a');
      const url = link?.href;
      const text = label || link?.textContent;
  
      if (text && url) {
        const submenu = document.createElement('a');
        submenu.href = url;
        submenu.textContent = text;
        submenu.target = '_blank';
        submenu.rel = 'noopener noreferrer';
        submenu.className = 'dropdown-item';
        dropdownContent.appendChild(submenu);
      }
    });
  
    // Assemble the block
    container.appendChild(dropdownTitle);
    container.appendChild(arrow);
    container.appendChild(dropdownContent);
  
    // Replace block content with transformed dropdown
    block.textContent = '';
    block.appendChild(container);
  
    // Hover events
    container.addEventListener('mouseenter', () => {
      dropdownContent.classList.add('open');
    });
  
    container.addEventListener('mouseleave', () => {
      dropdownContent.classList.remove('open');
    });
  }
  