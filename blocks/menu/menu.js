export default function decorateAllMenus(container = document) {
    const menus = container.querySelectorAll('.menu.block');
  
    menus.forEach((block) => {
      const divs = [...block.querySelectorAll(':scope > div')];
      if (divs.length < 2) return;
  
      // Get menu title from first div
      const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
      // Create dropdown container
      const container = document.createElement('div');
      container.className = 'dropdown-container';
  
      const dropdownTitle = document.createElement('div');
      dropdownTitle.className = 'dropdown-title';
      dropdownTitle.textContent = title;
  
      const dropdownContent = document.createElement('ul');
      dropdownContent.className = 'dropdown-content';
  
      // Process each submenu item
      for (let i = 1; i < divs.length; i++) {
        const label = divs[i].querySelector('div > p')?.textContent.trim();
        const linkEl = divs[i].querySelector('a');
        const href = linkEl?.href || '';
  
        if (label && href) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = label;
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          li.appendChild(a);
          dropdownContent.appendChild(li);
        }
      }
  
      // Assemble and render
      container.appendChild(dropdownTitle);
      container.appendChild(dropdownContent);
  
      // Clear and replace block content
      block.textContent = '';
      block.appendChild(container);
  
      // Add hover behavior
      container.addEventListener('mouseenter', () => {
        dropdownContent.classList.add('open');
      });
      container.addEventListener('mouseleave', () => {
        dropdownContent.classList.remove('open');
      });
    });
  }
  