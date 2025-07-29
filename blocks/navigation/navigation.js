export default function decorate(block) {
    const rows = Array.from(block.children);
    if (!rows.length) return;
  
    // 1. Title is in the first row's first inner div
    const titleRow = rows.shift();
    const title = titleRow.querySelector('p')?.textContent?.trim() || 'Menu';
  
    // 2. Extract items from each remaining row
    const items = rows.map((row) => {
      const innerDiv = row.querySelector('div');
      if (!innerDiv) return null;
  
      // Expect content like "Label | Link"
      const text = innerDiv.textContent.trim();
      const [label, link] = text.split('|').map(str => str.trim());
  
      if (!label || !link) return null;
  
      return { label, link };
    }).filter(Boolean); // Remove nulls
  
    // 3. Build dropdown container
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
  
    // Replace original block content
    block.innerHTML = '';
    block.appendChild(container);
  
    // Add toggle behavior
    container.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
      icon.textContent = dropdownContent.classList.contains('open') ? '▾' : '▴';
    });
  }
  