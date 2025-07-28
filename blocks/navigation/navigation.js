export default function decorate(block) {
    const fragment = document.createDocumentFragment();
  
    [...block.children].forEach((row) => {
      const cells = [...row.children];
      const text = cells.map(cell => cell.textContent.trim()).join(' | ');
      const p = document.createElement('p');
      p.textContent = text;
      fragment.appendChild(p);
    });
  
    block.textContent = '';
    block.appendChild(fragment);
  }
  