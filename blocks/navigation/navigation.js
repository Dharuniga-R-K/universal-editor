import { moveInstrumentation } from '../../scripts/scripts.js'; // import if available

export default function decorate(block) {
  // Create wrapper list element
  const ul = document.createElement('ul');
  ul.classList.add('cards-list');

  // Iterate through rows/elements originally in the block
  Array.from(block.children).forEach(row => {
    const li = document.createElement('li');
    li.classList.add('cards-item');

    // Move any block-level instrumentation into the <li>
    if (typeof moveInstrumentation === 'function') {
      moveInstrumentation(row, li);
    }

    // Transfer content: move row's children into the new li
    while (row.firstElementChild) {
      li.appendChild(row.firstElementChild);
    }

    // Assign classes based on content type
    Array.from(li.children).forEach(div => {
      if (
        div.children.length === 1 &&
        div.querySelector('picture')
      ) {
        div.classList.add('cards-card-image');
      } else {
        div.classList.add('cards-card-body');
      }
    });

    ul.appendChild(li);
  });

  // Replace original block content with new list
  block.innerHTML = '';
  block.appendChild(ul);
}
