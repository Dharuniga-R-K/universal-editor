export default function decorate(block) {
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    const rows = [...block.children];
  
    // Get dropdown title from the first row
    const titleDiv = rows[0]?.querySelector('div');
    const title = titleDiv?.textContent?.trim() || 'Menu';
  
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    const icon = document.createElement('span');
    icon.className = 'dropdown-icon';
    icon.textContent = '▴';
  
    const dropdownContent = document.createElement('ul');
    dropdownContent.className = 'dropdown-content';
  
    // Process the rest of the rows for label|link pairs
    rows.slice(1).forEach((row, i) => {
      const innerDiv = row.querySelector('div');
      const text = innerDiv?.textContent?.trim();
  
      if (!text || !text.includes('|')) {
        console.warn(`Row ${i + 2} is invalid or missing '|':`, text);
        return;
      }
  
      const [label, link] = text.split('|').map(s => s.trim());
      if (!label || !link) {
        console.warn(`Row ${i + 2} missing label or link`, { label, link });
        return;
      }
  
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
  
    block.innerHTML = '';
    block.appendChild(container);
  
    // Toggle logic
    container.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
      icon.textContent = dropdownContent.classList.contains('open') ? '▾' : '▴';
    });
  }
  