export default function decorate(block) {
  // Hide the original content
  [...block.children].forEach((child) => {
    child.classList.add('menu-original-hidden');
  });

  const divs = [...block.querySelectorAll(':scope > div')];
  const dropdownWrapper = document.createElement('div');
  dropdownWrapper.className = 'menu-wrapper';

  let i = 0;
  while (i < divs.length) {
    const titleDiv = divs[i];
    const title = titleDiv.querySelector('p')?.textContent.trim() || `Menu ${i}`;
    i++;

    const submenuItems = [];
    while (i < divs.length && !divs[i].querySelector('p')) {
      const label = divs[i].querySelector('div > p')?.textContent.trim();
      const link = divs[i].querySelector('a')?.href;
      if (label && link) submenuItems.push({ label, link });
      i++;
    }

    // Create dropdown only if submenu items exist
    if (submenuItems.length) {
      const dropdown = document.createElement('div');
      dropdown.className = 'menu-enhanced-dropdown';

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

      dropdown.append(titleEl, arrowEl, contentEl);
      dropdownWrapper.appendChild(dropdown);

      // Add hover behavior
      dropdown.addEventListener('mouseenter', () => {
        contentEl.classList.add('open');
      });

      dropdown.addEventListener('mouseleave', () => {
        contentEl.classList.remove('open');
      });
    }
  }

  block.appendChild(dropdownWrapper);
}
