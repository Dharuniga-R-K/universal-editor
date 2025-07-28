export default function decorate(block) {
    const raw = block.getAttribute('data-aue-model-navigationTabs');
    if (!raw) return;
    let tabs;
    try { tabs = JSON.parse(raw); }
    catch (e) {
      console.error('Invalid navigation JSON', raw, e);
      return;
    }
    const nav = document.createElement('nav');
    nav.className = 'nav-menu';
    tabs.forEach(tab => {
      const wrapper = document.createElement('div');
      wrapper.className = 'nav-tab';
      const title = document.createElement('span');
      title.className = 'nav-title';
      title.textContent = tab.tabName || '';
      wrapper.appendChild(title);
  
      if (Array.isArray(tab.name) && tab.name.length) {
        const ul = document.createElement('ul');
        ul.className = 'nav-dropdown';
        tab.name.forEach((label, i) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = label;
          a.href = (Array.isArray(tab.link) && tab.link[i]) || '#';
          li.appendChild(a);
          ul.appendChild(li);
        });
        wrapper.appendChild(ul);
        // Optional toggle on click:
        title.addEventListener('click', () => ul.classList.toggle('open'));
      }
  
      nav.appendChild(wrapper);
    });
    block.innerHTML = '';
    block.appendChild(nav);
  }
  