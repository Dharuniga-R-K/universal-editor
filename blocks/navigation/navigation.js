export default function decorate(blockElem) {
    const model = blockElem.getAttribute('data-aue-model-navigationTabs');
    const tabs = model ? JSON.parse(model) : [];
  
    const nav = document.createElement('nav');
    nav.className = 'nav-block';
  
    tabs.forEach(tab => {
      const tabDiv = document.createElement('div');
      tabDiv.className = 'nav-tab';
      const title = document.createElement('span');
      title.textContent = tab.tabName;
      tabDiv.appendChild(title);
  
      if (Array.isArray(tab.items)) {
        const ul = document.createElement('ul');
        ul.className = 'dropdown';
        tab.items.forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.link || '#';
          a.textContent = item.name || '';
          li.appendChild(a);
          ul.appendChild(li);
        });
        tabDiv.appendChild(ul);
      }
  
      nav.appendChild(tabDiv);
    });
  
    blockElem.innerHTML = '';
    blockElem.appendChild(nav);
  }
  