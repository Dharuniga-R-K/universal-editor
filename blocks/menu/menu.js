export default function decorate(block) {
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    // Hide original menu block content for authoring
    block.style.display = 'none';
  
    // Create horizontal container for titles
    const menuTitlesContainer = document.createElement('div');
    menuTitlesContainer.className = 'menu-titles-container';
  
    divs.forEach((div, index) => {
      const title = div.querySelector('p')?.textContent.trim() || 'No Title';
  
      // Create a title button
      const titleDiv = document.createElement('div');
      titleDiv.className = 'menu-title';
      titleDiv.textContent = title;
      titleDiv.dataset.index = index;
  
      // Create dropdown container (will hold submenu)
      const dropdownContent = document.createElement('div');
      dropdownContent.className = 'dropdown-content';
      dropdownContent.style.display = 'none'; // hidden by default
  
      // Clone submenu content from original div (skip first child which is title)
      const submenuDiv = div.cloneNode(true);
      // Remove first child (title) from submenuDiv to keep only submenu items
      if (submenuDiv.firstElementChild) submenuDiv.removeChild(submenuDiv.firstElementChild);
  
      dropdownContent.appendChild(submenuDiv);
  
      // Show dropdown on hover
      titleDiv.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
      });
      titleDiv.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
      });
      dropdownContent.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
      });
      dropdownContent.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
      });
  
      // Append title and dropdown
      menuTitlesContainer.appendChild(titleDiv);
      menuTitlesContainer.appendChild(dropdownContent);
    });
  
    // Insert menuTitlesContainer before the block
    block.parentElement.insertBefore(menuTitlesContainer, block);
  }
  