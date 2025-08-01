export default function decorate(block) {
  // Hide all original child blocks (components)
  [...block.querySelectorAll('.menu.block')].forEach(el => {
    el.classList.add('menu-original-hidden');
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'menu-wrapper';

  // For each .menu.block, extract title and submenu items
  [...block.querySelectorAll('.menu.block')].forEach(menuBlock => {
    const titleText = menuBlock.querySelector('.menu-original-hidden > div > p')?.textContent.trim();
    if (!titleText) return;

    const submenuBlocks = [...menuBlock.querySelectorAll('.menu-original-hidden')]
      .filter(el => el.querySelector('a'));

    const submenuItems = submenuBlocks.map(el => {
      const label = el.querySelector('div > p')?.textContent.trim();
      const link = el.querySelector('a')?.href;
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);

    if (submenuItems.length === 0) return;

    // Build dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'menu-enhanced-dropdown';

    const titleEl = document.createElement('div');
    titleEl.className = 'dropdown-title';
    titleEl.innerHTML = `${titleText} <span class="dropdown-arrow">▼</span>`;

    const contentEl = document.createElement('ul');
    contentEl.className = 'dropdown-content';

    submenuItems.forEach(({label, link}) => {
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

    dropdown.append(titleEl, contentEl);
    wrapper.appendChild(dropdown);

    dropdown.addEventListener('mouseenter', () => {
      contentEl.classList.add('open');
    });
    dropdown.addEventListener('mouseleave', () => {
      contentEl.classList.remove('open');
    });
  });

  block.appendChild(wrapper);
}
