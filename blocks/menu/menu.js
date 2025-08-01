export default function decorate(block) {
  // Hide original children
  [...block.children].forEach((child) => {
    child.classList.add('menu-original-hidden');
  });

  const menuWrapper = document.createElement('div');
  menuWrapper.className = 'menu-wrapper';

  // Loop through each dropdown block
  [...block.children].forEach((child) => {
    const divs = [...child.querySelectorAll(':scope > div')];
    const title = divs[0]?.querySelector('p')?.textContent.trim() || 'Menu';

    const submenuItems = divs.slice(1).map((div) => {
      const label = div.querySelector('div > p')?.textContent.trim();
      const link = div.querySelector('a')?.href;
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);

    if (submenuItems.length === 0) return;

    // Dropdown wrapper
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'menu-enhanced-dropdown';

    // Title + Arrow container
    const titleContainer = document.createElement('div');
    titleContainer.className = 'dropdown-title';

    const titleEl = document.createElement('span');
    titleEl.className = 'dropdown-title-text';
    titleEl.textContent = title;

    const arrowEl = document.createElement('span');
    arrowEl.className = 'dropdown-arrow';
    arrowEl.textContent = '▼';

    titleContainer.append(titleEl, arrowEl);

    const contentEl = document.createElement('ul');
    contentEl.className = 'dropdown-content';

    submenuItems.forEach(({ label, link }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'dropdown-item';
      a.href = link;
      a.textContent = label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      contentEl.appendChild(li);
    });

    dropdownWrapper.append(titleContainer, contentEl);
    menuWrapper.appendChild(dropdownWrapper);

    // Hover behavior on wrapper
    dropdownWrapper.addEventListener('mouseenter', () => {
      contentEl.classList.add('open');
    });

    dropdownWrapper.addEventListener('mouseleave', () => {
      contentEl.classList.remove('open');
    });
  });

  // Clear original and append menu
  
  block.appendChild(menuWrapper);
}
