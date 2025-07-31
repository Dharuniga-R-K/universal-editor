export default function decorate(block) {
    // Detect if we're in authoring mode (Universal Editor)
    const isAuthoring = window?.hlx?.editor?.isEditing;
    if (isAuthoring) return;
  
    const divs = [...block.querySelectorAll(':scope > div')];
    if (divs.length < 2) return;
  
    // Extract dropdown title from first <div>
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    // Parse submenu items from remaining <div>s
    const submenuItems = divs.slice(1).map((div) => {
      const label = div.querySelector('div > p')?.textContent.trim() || '';
      const link = div.querySelector('a')?.href || '#';
      return { label, link };
    });
  
    // Create container
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    // Create title
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    // Optional arrow (downward only)
    const arrow = document.createElement('span');
    arrow.className = 'dropdown-arrow';
    arrow.textContent = '▼';
  
    // Create submenu content
    const dropdownContent = document.createElement('ul');
    dropdownContent.className = 'dropdown-content';
  
    submenuItems.forEach(({ label, link }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = label;
      a.href = link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      dropdownContent.appendChild(li);
    });
  
    // Compose DOM
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'dropdown-title-wrapper';
    titleWrapper.appendChild(dropdownTitle);
    titleWrapper.appendChild(arrow);
  
    container.appendChild(titleWrapper);
    container.appendChild(dropdownContent);
  
    // Replace old content
    block.textContent = '';
    block.appendChild(container);
  
    // Hover behavior
    container.addEventListener('mouseenter', () => {
      dropdownContent.classList.add('open');
    });
  
    container.addEventListener('mouseleave', () => {
      dropdownContent.classList.remove('open');
    });
  }
  