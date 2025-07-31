export default function decorate(block) {
    const divs = [...block.querySelectorAll(':scope > div')];
    if (divs.length < 2) return;
  
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    // Extract submenu items from divs starting at index 1
    const submenuItems = divs.slice(1).map(div => {
      const label = div.querySelector('div > p')?.textContent.trim() || '';
      const link = div.querySelector('a')?.href || '#';
      return { label, link };
    });
  
    // Create dropdown container
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    // Title with arrow below
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    const dropdownArrow = document.createElement('div');
    dropdownArrow.className = 'dropdown-arrow';
    dropdownArrow.textContent = '▼';
  
    // Dropdown list container
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
  
    container.appendChild(dropdownTitle);
    container.appendChild(dropdownArrow);
    container.appendChild(dropdownContent);
  
    // Append dropdown container **without removing existing markup**
    block.appendChild(container);
  
    // Show dropdown on hover
    container.addEventListener('mouseenter', () => {
      dropdownContent.classList.add('open');
      // Optional: hide original menu items visually when dropdown opens
      divs.slice(1).forEach(div => div.style.display = 'none');
    });
    container.addEventListener('mouseleave', () => {
      dropdownContent.classList.remove('open');
      divs.slice(1).forEach(div => div.style.display = '');
    });
  }
  