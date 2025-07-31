// export default function decorate(block) {
//     const divs = [...block.querySelectorAll(':scope > div')];
//     if (divs.length < 2) return; // Need at least 2 divs
  
//     // Extract title for dropdown
//     const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';
  
//     // Extract submenu label and link
//     const label = divs[1].querySelector('div > p')?.textContent.trim() || '';
//     const link = divs[1].querySelector('a')?.href || '#';
  
//     // Create container
//     const container = document.createElement('div');
//     container.className = 'dropdown-container';
  
//     // Create dropdown title
//     const dropdownTitle = document.createElement('div');
//     dropdownTitle.className = 'dropdown-title';
//     dropdownTitle.textContent = title;
  
//     // Create dropdown content
//     const dropdownContent = document.createElement('ul');
//     dropdownContent.className = 'dropdown-content';
  
//     // Create list item for submenu
//     const li = document.createElement('li');
//     const a = document.createElement('a');
//     a.textContent = label;    // show "nav - 1"
//     a.href = link;            // link URL
//     a.target = '_blank';      // open in new tab (optional)
//     a.rel = 'noopener noreferrer';
  
//     li.appendChild(a);
//     dropdownContent.appendChild(li);
  
//     container.appendChild(dropdownTitle);
//     container.appendChild(dropdownContent);
  
//     // Clear old content and append
//     block.textContent = '';
//     block.appendChild(container);
  
//     // Show dropdown on hover (if you want)
//     container.addEventListener('mouseenter', () => {
//       dropdownContent.classList.add('open');
//     });
//     container.addEventListener('mouseleave', () => {
//       dropdownContent.classList.remove('open');
//     });
//   }
  