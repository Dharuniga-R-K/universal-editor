export default function decorate(block) {
  // Hide original content
  [...block.children].forEach((child) => {
    child.classList.add('menu-original-hidden');
  });

  const menuWrapper = document.createElement('div');
  menuWrapper.className = 'menu-wrapper';

  // Process each group of (title + submenu items)
  let children = [...block.children];
  for (let i = 0; i < children.length; ) {
    const titleDiv = children[i];
    const title = titleDiv.querySelector('p')?.textContent.trim();
    const submenuItems = [];

    let j = i + 1;
    // Collect submenu items until we reach the next title or end
    while (j < children.length && !children[j].querySelector('p')) {
      const link = children[j].querySelector('a')?.href;
      const label = children[j].querySelector('div > p')?.textContent.trim();
      if (label && link) submenuItems.push({ label, link });
      j++;
    }

    // Only if valid title and at least 1 submenu
    if (title && submenuItems.length) {
      const dropdownWrapper = document.createElement('div');
      dropdownWrapper.className = 'menu-enhanced-dropdown';

      const titleEl = document.createElement('div');
      titleEl.className = 'dropdown-title';
      titleEl.innerHTML = `${title} <span class="dropdown-arrow">▼</span>`;

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

      dropdownWrapper.append(titleEl, contentEl);
      menuWrapper.appendChild(dropdownWrapper);

      // Hover logic
      dropdownWrapper.addEventListener('mouseenter', () => {
        contentEl.classList.add('open');
      });
      dropdownWrapper.addEventListener('mouseleave', () => {
        contentEl.classList.remove('open');
      });
    }

    i = j; // Move to next group
  }

  // Append flattened result
  block.appendChild(menuWrapper);
}
