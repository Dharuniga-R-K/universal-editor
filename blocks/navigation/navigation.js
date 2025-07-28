export default function decorate(block) {
    const message = block.textContent.trim(); // AEM EDS will render raw value inside block
    block.innerHTML = ''; // Clear default rendering
    const n = document.createElement('n');
    n.className = 'simple-text-message';
    n.textContent = message;
    block.appendChild(n);
  }