import { renderBlock } from '../../scripts/faintly.js';

function createMenu(mainMenuItems) {
  const mainMenuDropdown = document.createDocumentFragment();
  mainMenuItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.label;
    li.dataset.submenu = item.submenu ? JSON.stringify(item.submenu) : null;
    mainMenuDropdown.appendChild(li);
  });
  return mainMenuDropdown;
}

function createSubMenu(submenuItems) {
  const submenuWrapper = document.createElement('div');
  submenuWrapper.classList.add('submenu');
  const ul = document.createElement('ul');
  submenuItems.forEach(subItem => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = subItem.url;
    a.textContent = subItem.label;
    li.appendChild(a);
    ul.appendChild(li);
  });
  submenuWrapper.appendChild(ul);
  return submenuWrapper;
}

export default async function decorate(block) {
  // Fetch menu JSON path from block attribute or hardcode path here
  const menuJsonPath = block.dataset.menuPath || '/menu.json';
  
  // Clone template
  const template = document.getElementById('faintly-template--blocks--menu-excel');
console.log('Template element:', template);
if (!template) {
  console.error('Template with id faintly-template--blocks--menu-excel not found in DOM!');
  return;
}
  const templateContent = template.content.cloneNode(true);
  
  // Fetch menu data
  const response = await fetch(menuJsonPath);
  const menuData = await response.json();

  // Set up main menu dropdown
  const mainMenuDropdown = templateContent.querySelector('.main-menu-dropdown');
  menuData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.label;
    li.dataset.submenu = item.submenu ? JSON.stringify(item.submenu) : null;
    mainMenuDropdown.appendChild(li);
  });

  // Main menu button and submenu wrapper references
  const mainMenuButton = templateContent.querySelector('.main-menu-button');
  const mainMenuLabel = mainMenuButton.querySelector('.label');
  const submenuWrapper = templateContent.querySelector('.submenu-wrapper');

  // Initial label
  mainMenuLabel.textContent = 'SELECT THE INDICATION';

  // Add event listener for main menu dropdown
  mainMenuDropdown.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      const submenuItems = li.dataset.submenu ? JSON.parse(li.dataset.submenu) : null;
      mainMenuLabel.textContent = li.textContent;

      // Clear previous submenu
      submenuWrapper.innerHTML = '';

      if (submenuItems && submenuItems.length) {
        // Render submenu using helper function
        const submenuEl = createSubMenu(submenuItems);
        submenuWrapper.appendChild(submenuEl);
      }
    });
  });

  // Clear the block and append the template content
  block.innerHTML = '';
  block.appendChild(templateContent);
}
