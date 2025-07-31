export default function decorate(block) {
    // Get the title (from first div > p)
    const title = block.querySelector(':scope > div:first-child p')?.textContent.trim() || 'Menu';
  
    // Collect submenu items from all sibling divs except the first (which is the title)
    const submenuItems = [...block.querySelectorAll(':scope > div:not(:first-child)')].map(div => {
      const label = div.querySelector('div > p')?.textContent.trim() || '';
      const link = div.querySelector('a')?.href || '#';
      return { label, link };
    });
  
    // Create dropdown container
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    // Create dropdown title
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    // Create arrow below title (static down arrow)
    const arrow = document.createElement('div');
    arrow.className = 'dropdown-arrow';
    arrow.textContent = '▼';  // simple down arrow
  
    // Create dropdown content (submenu list)
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
  
    // Append title, arrow, and dropdown content to container
    container.appendChild(dropdownTitle);
    container.appendChild(arrow);
    container.appendChild(dropdownContent);
  
    // Append container to block (do NOT clear block content)
    block.appendChild(container);
  
    // Show dropdown on hover
    container.addEventListener('mouseenter', () => {
      dropdownContent.classList.add('open');
    });
    container.addEventListener('mouseleave', () => {
      dropdownContent.classList.remove('open');
    });
  }
  