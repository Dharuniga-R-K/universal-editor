export default function decorate(block) {
    const rows = [...block.children];
    block.innerHTML = ''; // Clear the original content
  
    rows.forEach((row) => {
      const cells = [...row.children];
      const p = document.createElement('p');
  
      // Join text values of each field with separator
      const values = cells.map((cell) => cell.textContent.trim());
      p.textContent = values.join(' | ');
  
      block.appendChild(p);
    });
  }
  