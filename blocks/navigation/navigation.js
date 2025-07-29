export default function decorate(block) {
    console.log('Block loaded:', block);
  
    const rows = Array.from(block.children);
    console.log('Row count:', rows.length);
    if (!rows.length) return;
  
    const titleRow = rows.shift();
    const title = titleRow.querySelector('p')?.textContent?.trim() || 'Menu';
    console.log('Parsed Title:', title);
  
    const items = rows.map((row, i) => {
      const innerDiv = row.querySelector('div');
      if (!innerDiv) {
        console.warn(`Row ${i + 1} has no inner div`);
        return null;
      }
  
      const text = innerDiv.textContent.trim();
      console.log(`Row ${i + 1} raw text:`, text);
  
      const [label, link] = text.split('|').map(str => str.trim());
  
      if (!label || !link) {
        console.warn(`Row ${i + 1} missing label or link`);
        return null;
      }
  
      return { label, link };
    }).filter(Boolean);
  
    console.log('Final parsed items:', items);
  
    // Create dropdown container
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
  
    // Now populate items
    if (items.length === 0) {
      console.warn('No items to render in dropdown');
    }
  
    items.forEach(item => {
      console.log('Rendering item:', item);
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.label;
      a.href = item.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      dropdownContent.appendChild(li);
    });
  
    // Assemble dropdown
    container.appendChild(dropdownTitle);
    container.appendChild(icon);
    container.appendChild(dropdownContent);
  
    // Replace block content
    block.innerHTML = '';
    block.appendChild(container);
  
    // Toggle dropdown
    container.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
      icon.textContent = dropdownContent.classList.contains('open') ? '▾' : '▴';
    });
  }
  