export default function decorate(block) {
  const message = block.textContent.trim(); // AEM EDS will render raw value inside block
  block.innerHTML = ''; // Clear default rendering
  const p = document.createElement('p');
  p.className = 'simple-text-message';
  p.textContent = message;
  block.appendChild(p);
}
