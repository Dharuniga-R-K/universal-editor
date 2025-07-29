export default function decorate(block) {
  const divs = [...block.querySelectorAll(':scope > div')];
  const title = divs[0].querySelector('p')?.textContent.trim() || 'Dropdown';
  const itemsString = divs[1].querySelector('p')?.textContent.trim() || '';
  const items = itemsString.split(',')
    .map((item) => {
      const [label, link] = item.split('|').map((s) => s.trim());
      return label && link ? {
        label,
        link,
      } : null;
    })
    .filter(Boolean);

  const container = document.createElement('div');
  container.className = 'dropdown-container';

  const header = document.createElement('div');
  header.className = 'dropdown-header';

  const dropdownTitle = document.createElement('div');
  dropdownTitle.className = 'dropdown-title';
  dropdownTitle.textContent = title;

  const icon = document.createElement('span');
  icon.className = 'dropdown-icon';
  icon.textContent = '▾';

  header.appendChild(dropdownTitle);
  header.appendChild(icon);

  const dropdownContent = document.createElement('ul');
  dropdownContent.className = 'dropdown-content';

  items.forEach(({
    label,
    link,
  }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = label;
    a.href = link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    li.appendChild(a);
    dropdownContent.appendChild(li);
  });

  container.appendChild(header);
  container.appendChild(dropdownContent);

  block.textContent = '';
  block.appendChild(container);
}
