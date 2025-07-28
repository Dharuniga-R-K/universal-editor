export default function decorate(block) {
    const raw = block.getAttribute('data-aue-model-navigation');
    const tabs = raw ? JSON.parse(raw) : [];
  
    // Clean container
    block.innerHTML = '';
    block.classList.add('navigation-block');
  
    // Build wrapper
    const nav = document.createElement('nav');
    nav.className = 'nav-block';
    block.appendChild(nav);
  
    tabs.forEach((tab) => {
      const tabDiv = document.createElement('div');
      tabDiv.className = 'nav-tab';
  
      const title = document.createElement('div');
      title.className = 'tab-title';
      title.textContent = tab.tabName || 'Untitled Tab';
      tabDiv.appendChild(title);
  
      if (Array.isArray(tab.items)) {
        const ul = document.createElement('ul');
        ul.className = 'dropdown';
        tab.items.forEach((item) => {
          const li = document.createElement('li');
          li.className = 'dropdown-item';
          const a = document.createElement('a');
          a.href = item.link || '#';
          a.textContent = item.name || 'Untitled';
          li.appendChild(a);
          ul.appendChild(li);
        });
        tabDiv.appendChild(ul);
      }
  
      nav.appendChild(tabDiv);
    });
  }
  