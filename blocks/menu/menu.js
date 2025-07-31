export default function decorate(block) {
    const divs = [...block.querySelectorAll(':scope > div')];
    if (divs.length < 2) return;
  
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    // Collect all submenu items (starting from 2nd div)
    const submenuItems = divs.slice(1).map(div => {
      const label = div.querySelector('div > p')?.textContent.trim() || '';
      const link = div.querySelector('a')?.href || '#';
      return { label, link };
    });
  
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    const dropdownTitle = document.createElement('div');
    dropdownTitle.className = 'dropdown-title';
    dropdownTitle.textContent = title;
  
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
    container.appendChild(dropdownContent);
  
    block.textContent = '';
    block.appendChild(container);
  
    container.addEventListener('mouseenter', () => {
      dropdownContent.classList.add('open');
    });
    container.addEventListener('mouseleave', () => {
      dropdownContent.classList.remove('open');
    });
  }
  