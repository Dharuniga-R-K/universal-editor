export default function decorate(block) {

    const divs = [...block.querySelectorAll(':scope > div')];

    if (divs.length < 2) return; // Need at least 2 divs

 

    // Extract title for dropdown (from first div)

    const title = divs[0].querySelector('p')?.textContent.trim() || 'Menu';

 

    // Create container

    const container = document.createElement('div');

    container.className = 'dropdown-container';

 

    // Create dropdown title

    const dropdownTitle = document.createElement('div');

    dropdownTitle.className = 'dropdown-title';

    dropdownTitle.textContent = title;

 

    // Create dropdown content

    const dropdownContent = document.createElement('ul');

    dropdownContent.className = 'dropdown-content';

 

    // Loop through all submenu divs (from 2nd div onward)

    for (let i = 1; i < divs.length; i++) {

      const label = divs[i].querySelector('div > p')?.textContent.trim() || '';

      const link = divs[i].querySelector('a')?.href || '#';

 

      if (label) {

        const li = document.createElement('li');

        const a = document.createElement('a');

        a.textContent = label;

        a.href = link;

        a.target = '_blank';

        a.rel = 'noopener noreferrer';

 

        li.appendChild(a);

        dropdownContent.appendChild(li);

      }

    }

 

    container.appendChild(dropdownTitle);

    container.appendChild(dropdownContent);

 

    // Clear old content and append dropdown container

    block.textContent = '';

    block.appendChild(container);

 

    // Show dropdown on hover

    container.addEventListener('mouseenter', () => {

      dropdownContent.classList.add('open');

    });

    container.addEventListener('mouseleave', () => {

      dropdownContent.classList.remove('open');

    });

  }

 