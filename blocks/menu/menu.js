export default function decorate(block) {
  const divs = [...block.querySelectorAll(':scope > div')];
  if (divs.length < 2) return;

  // Extract title from first div's <p>
  const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';

  // Extract menu items from second div's children paragraphs or anchors
  const items = [...divs[1].querySelectorAll('p a')].map((a) => ({
    label: a.textContent.trim(),
    link: a.href,
  }));

  // Clear block content
  block.textContent = '';

  // Create container div with class
  const container = document.createElement('div');
  container.className = 'menu';

  // Create title div
  const titleDiv = document.createElement('div');
  titleDiv.className = 'menu-title';

  const p = document.createElement('p');
  p.textContent = `${title} `;

  const arrow = document.createElement('span');
  arrow.className = 'arrow';
  arrow.textContent = '▾';

  p.appendChild(arrow);
  titleDiv.appendChild(p);

  container.appendChild(titleDiv);

  // Create dropdown container
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown-content';

  items.forEach(({ label, link }) => {
    const a = document.createElement('a');
    a.href = link;
    a.textContent = label;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    dropdown.appendChild(a);
  });

  container.appendChild(dropdown);
  block.appendChild(container);
}
