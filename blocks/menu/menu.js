export default function decorate(block) {
    // Get all direct child divs
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    // Create container for titles horizontally
    const menuTitlesContainer = document.createElement('div');
    menuTitlesContainer.className = 'menu-titles-container';
  
    divs.forEach(div => {
      const title = div.querySelector('p')?.textContent.trim() || 'No Title';
      const titleDiv = document.createElement('div');
      titleDiv.className = 'menu-title';
      titleDiv.textContent = title;
      menuTitlesContainer.appendChild(titleDiv);
    });
  
    // Append container before the block
    block.parentElement.insertBefore(menuTitlesContainer, block);
  }
  