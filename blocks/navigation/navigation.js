export default function decorate(block) {
  const raw = block.dataset.aueModelNavigationTabs; // same as getAttribute

  const nav = document.createElement('nav');
  nav.className = 'nav-menu';

  tabs.forEach((tab) => {
    const tabWrapper = document.createElement('div');
    tabWrapper.className = 'nav-tab';

    const title = document.createElement('span');
    title.className = 'nav-title';
    title.textContent = tab.tabName;
    tabWrapper.appendChild(title);

    if (Array.isArray(tab.name) && tab.name.length) {
      const ul = document.createElement('ul');
      ul.className = 'nav-dropdown';

      tab.name.forEach((label, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = label;
        a.href = tab.link && tab.link[i] ? tab.link[i] : '#';
        li.appendChild(a);
        ul.appendChild(li);
      });

      tabWrapper.appendChild(ul);

      // Optional: toggle dropdown on click
      title.addEventListener('click', () => ul.classList.toggle('open'));
    }

    nav.appendChild(tabWrapper);
  });

  block.textContent = '';
  block.appendChild(nav);
}
