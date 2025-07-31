export default function decorate(block) {
    const divs = [...block.children];
    if (divs.length < 2) return;
  
    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
    // Collect submenu items, handling <a> or fallback to raw URL text
    const submenuItems = divs.slice(1).map(div => {
      const label = div.querySelector('div > p')?.textContent.trim();
  
      const aTag = div.querySelector('a');
      let link;
      if (aTag) {
        link = aTag.href;
      } else {
        link = div.querySelector('div:nth-child(2) > p')?.textContent.trim() || '#';
      }
  
      return (label && link) ? { label, link } : null;
    }).filter(Boolean);
  
    // Build a simple ul/li list
    const ul = document.createElement('ul');
    
    // Add title as first list item (not clickable)
    const titleLi = document.createElement('li');
    titleLi.textContent = title;
    titleLi.style.fontWeight = 'bold';
    ul.appendChild(titleLi);
  
    // Add submenu items
    submenuItems.forEach(({ label, link }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link;
      a.textContent = label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      ul.appendChild(li);
    });
  
    // Clear original content and append list
    block.textContent = '';
    block.append(ul);
  }
  