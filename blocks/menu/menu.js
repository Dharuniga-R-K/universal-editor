export default function decorate(block) {
    // Step 1: Add hide class to all direct child <div>s under .menu.block
    const childDivs = [...block.querySelectorAll(':scope > div')];
    childDivs.forEach(div => {
      div.classList.add('menu-original-hidden'); // This will be used in CSS to hide
    });
  
    if (childDivs.length < 2) return;
  
    // Step 2: Extract title and submenu items
    const title = childDivs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    const submenuItems = childDivs.slice(1).map((div) => {
      const label = div.querySelector('p')?.textContent.trim();
      const link = div.querySelector('a')?.href;
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);
  
    // Step 3: Build new dropdown UI
    const wrapper = document.createElement('div');
    wrapper.className = 'menu-enhanced-dropdown';
  
    const titleEl = document.createElement('div');
    titleEl.className = 'dropdown-title';
    titleEl.textContent = title;
  
    const arrowEl = document.createElement('div');
    arrowEl.className = 'dropdown-arrow';
    arrowEl.textContent = '▼';
  
    const contentEl = document.createElement('div');
    contentEl.className = 'dropdown-content';
  
    submenuItems.forEach(({ label, link }) => {
      const a = document.createElement('a');
      a.href = link;
      a.textContent = label;
      a.className = 'dropdown-item';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      contentEl.appendChild(a);
    });
  
    wrapper.append(titleEl, arrowEl, contentEl);
    block.appendChild(wrapper); // Append new UI after hiding old divs
  }
  