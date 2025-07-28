export default function decorate(block) {
    // Get model data from Universal Editor
    const modelData = block.dataset.aueModelNavigation;
    if (!modelData) return;
  
    let parsed;
    try {
      parsed = JSON.parse(modelData);
    } catch (e) {
      console.error('Failed to parse navigation model data:', e);
      return;
    }
  
    const { navigationTabs } = parsed;
    if (!Array.isArray(navigationTabs)) return;
  
    // Create navigation container
    const nav = document.createElement('nav');
    nav.classList.add('navigation');
  
    navigationTabs.forEach((tab) => {
      const tabWrapper = document.createElement('div');
      tabWrapper.classList.add('nav-tab');
  
      // Main tab label
      const tabLabel = document.createElement('button');
      tabLabel.classList.add('tab-name');
      tabLabel.textContent = tab.tabName;
      tabWrapper.appendChild(tabLabel);
  
      // Dropdown (if present)
      if (Array.isArray(tab.name) && Array.isArray(tab.link)) {
        const dropdown = document.createElement('ul');
        dropdown.classList.add('dropdown');
  
        tab.name.forEach((label, i) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = label;
          a.href = tab.link[i] || '#';
          li.appendChild(a);
          dropdown.appendChild(li);
        });
  
        tabWrapper.appendChild(dropdown);
  
        // Show/hide logic
        tabLabel.addEventListener('click', () => {
          dropdown.classList.toggle('open');
        });
      }
  
      nav.appendChild(tabWrapper);
    });
  
    block.textContent = ''; // Clear existing
    block.appendChild(nav);
  }