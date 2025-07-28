export default function decorate(block) {
    const raw = block.getAttribute('data-aue-model-navigationTabs');
    if (!raw) return;
    const tabs = JSON.parse(raw);
    block.innerHTML = '';
  
    const nav = document.createElement('nav');
    tabs.forEach(tab => {
      const tabEl = document.createElement('div');
      tabEl.textContent = tab.tabName || '';
      if (Array.isArray(tab.items)) {
        const ul = document.createElement('ul');
        tab.items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item.name || '';
          ul.appendChild(li);
        });
        tabEl.appendChild(ul);
      }
      nav.appendChild(tabEl);
    });
    block.appendChild(nav);
  }
  