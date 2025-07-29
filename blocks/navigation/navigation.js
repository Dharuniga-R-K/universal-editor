export default function decorate(block) {
    const rows = Array.from(block.children);
    if (!rows.length) return;
  
    // 1. Get dropdown title from first row
    const titleRow = rows.shift();
    const title = titleRow.querySelector('p')?.textContent?.trim() || 'Menu';
  
    // 2. Extract dropdown items
    const items = rows.map((row) => {
      const cells = row.querySelectorAll('div');
      const label = cells[0]?.textContent?.trim() || '';
      const link = cells[1]?.textContent?.trim() || '#';
      return { label, link };
    }).filter(item => item.label); // Filter out empty rows
  
    // 3. Build dropdown
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
  
    items.forEach(({ label, link }) => {
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
    container.appendChild(icon);
    container.appendChild(dropdownContent);
  
    // Replace original block content with dropdown
    block.innerHTML = '';
    block.appendChild(container);
  
    // Toggle behavior
    container.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
      icon.textContent = dropdownContent.classList.contains('open') ? '▾' : '▴';
    });
  }
  