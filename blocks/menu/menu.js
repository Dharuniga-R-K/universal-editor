export default function decorate(block) {
  // Hide original children
  [...block.children].forEach((child) => {
    child.classList.add('menu-original-hidden');
  });

  // Create the wrapper to hold all dropdowns side-by-side
  const menuWrapper = document.createElement('div');
  menuWrapper.className = 'menu-wrapper';

  // Loop over each block-level child div
  [...block.children].forEach((child) => {
    const divs = [...child.querySelectorAll(':scope > div')];
    const title = divs[0]?.querySelector('p')?.textContent.trim() || 'Menu';

    const submenuItems = divs.slice(1).map((div) => {
      const label = div.querySelector('div > p')?.textContent.trim();
      const link = div.querySelector('a')?.href;
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);

    if (submenuItems.length === 0) return; // skip empty

    // Build dropdown structure
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'menu-enhanced-dropdown';

    const titleEl = document.createElement('div');
    titleEl.className = 'dropdown-title';
    titleEl.textContent = title;

    const arrowEl = document.createElement('div');
    arrowEl.className = 'dropdown-arrow';
    arrowEl.textContent = '▼';

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

    dropdownWrapper.append(titleEl, arrowEl, contentEl);
    menuWrapper.appendChild(dropdownWrapper);

    // Hover behavior
    dropdownWrapper.addEventListener('mouseenter', () => {
      contentEl.classList.add('open');
    });

    dropdownWrapper.addEventListener('mouseleave', () => {
      contentEl.classList.remove('open');
    });
  });

  // Clear block and append the wrapper
 
  block.appendChild(menuWrapper);
}
