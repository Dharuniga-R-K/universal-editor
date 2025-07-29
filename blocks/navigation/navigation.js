export default function decorate(block) {
    const divs = [...block.querySelectorAll(':scope > div')];
    if (divs.length < 2) return; // Need at least 2 divs
  
    // Extract title
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Dropdown';
  
    // Extract items string and parse it
    const itemsString = divs[1].querySelector('p')?.textContent.trim() || '';
    // Split by comma, then split each by '|'
    const items = itemsString.split(',')
      .map(item => {
        const [label, link] = item.split('|').map(s => s.trim());
        return label && link ? { label, link } : null;
      })
      .filter(Boolean);
  
    // Create dropdown container
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
    // const icon = document.createElement('span');
    // icon.className = 'dropdown-icon';
    // icon.textContent = '▴';
  
    // Dropdown list
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
  
    // Clear old content and append dropdown
    block.textContent = '';
    block.appendChild(container);
  
    // Toggle dropdown open/close
    container.addEventListener('click', () => {
      dropdownContent.classList.toggle('open');
    });
  }
  