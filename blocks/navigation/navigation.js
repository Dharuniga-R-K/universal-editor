export default function decorate(block) {
    const rows = Array.from(block.children);
    if (!rows.length) return;
  
    // Step 1: Get title
    const titleRow = rows.shift();
    const title = titleRow.querySelector('p')?.textContent?.trim() || 'Menu';
  
    // Step 2: Extract label|link from each row
    const items = rows.map((row) => {
      const innerDiv = row.querySelector('div');
      if (!innerDiv) return null;
  
      const text = innerDiv.textContent.trim();
      const parts = text.split('|').map(str => str.trim());
  
      if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  
      return {
        label: parts[0],
        link: parts[1]
      };
    }).filter(Boolean);
  
    // ✅ Step 3: Create dropdown elements before touching the block DOM
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    const icon = document.createElement('span');
    icon.className = 'dropdown-icon';
    icon.textContent = '▴';
  
    const dropdownContent = document.createElement('ul');
    dropdownContent.className = 'dropdown-content';
  
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
  
      const li = document.createElement('li');
      const a = document.createElement('a');
  
      a.textContent = item.label || 'Link';
      a.href = item.link || '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
  
      li.appendChild(a);
      dropdownContent.appendChild(li);
    }
  
    // Assemble the dropdown
    container.appendChild(dropdownTitle);
    container.appendChild(icon);
    container.appendChild(dropdownContent);
  
    // ✅ Now replace block content
    block.innerHTML = '';
    block.appendChild(container);
  
    // Step 4: Add toggle behavior
    container.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
      icon.textContent = dropdownContent.classList.contains('open') ? '▾' : '▴';
    });
  }
  