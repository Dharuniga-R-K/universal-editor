import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  block.classList.add('navigation');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const label = cells[0].textContent.trim();
    const targetId = cells[1].textContent.trim();

    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = label;
    a.href = `#${targetId}`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });

    moveInstrumentation(row, li);
    li.appendChild(a);
    ul.appendChild(li);
  });

  block.textContent = '';
  block.appendChild(ul);
}
