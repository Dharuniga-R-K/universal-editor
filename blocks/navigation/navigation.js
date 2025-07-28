export default function decorate(blockElem) {
  const items = blockElem.getAttribute('data-aue-model-items') || [];
  const data = Array.isArray(items) ? items : JSON.parse(items || '[]');

  const nav = document.createElement('nav');
  nav.className = 'nav-block';

  const ul = document.createElement('ul');
  ul.className = 'nav-items';

  data.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'nav-item';

    const a = document.createElement('a');
    a.href = item.link || '#';
    a.textContent = item.title;
    li.appendChild(a);

    if (Array.isArray(item.children) && item.children.length) {
      const sub = document.createElement('ul');
      sub.className = 'dropdown';
      item.children.forEach((child) => {
        const cli = document.createElement('li');
        cli.className = 'dropdown-item';
        const ca = document.createElement('a');
        ca.href = child.link || '#';
        ca.textContent = child.title;
        cli.appendChild(ca);
        sub.appendChild(cli);
      });
      li.appendChild(sub);
    }

    ul.appendChild(li);
  });

  nav.appendChild(ul);
  blockElem.appendChild(nav);
}
