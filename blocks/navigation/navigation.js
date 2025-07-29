export default function decorate(block) {
    const rows = Array.from(block.children);
    if (!rows.length) return;
  
    // 1. Title
    const titleRow = rows.shift();
    const title = titleRow.querySelector('p')?.textContent?.trim() || 'Menu';
    console.log('Parsed Title:', title);
  
    // 2. Extract items assuming each row has two <div>s: label and link
    const items = rows.map((row, i) => {
      const cols = row.querySelectorAll('div');
      const label = cols[0]?.textContent?.trim();
      const link = cols[1]?.textContent?.trim();
  
      if (!label || !link) {
        console.warn(`Row ${i + 1} missing label or link`, { label, link });
        return null;
      }
  
      return { label, link };
    }).filter(Boolean);
  
    console.log('Parsed items:', items);
  
    // 3. Create DOM
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
  
    items.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.label;
      a.href = item.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      dropdownContent.appendChild(li);
    });
  
    container.appendChild(dropdownTitle);
    container.appendChild(icon);
    container.appendChild(dropdownContent);
  
    block.innerHTML = '';
    block.appendChild(container);
  
    container.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
      icon.textContent = dropdownContent.classList.contains('open') ? '▾' : '▴';
    });
  }
  