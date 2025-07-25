export default function renderNavigationBlock(container) {
    const html = `
      <nav class="nav-block">
        <ul class="nav-items">
          <li class="nav-item">Platform
            <ul class="dropdown">
              <li>Web SDK</li>
              <li>React SDK</li>
              <li>Java SDK</li>
            </ul>
          </li>
          <li class="nav-item">Resources
            <ul class="dropdown">
              <li>Docs</li>
              <li>Tutorial</li>
              <li>Community</li>
            </ul>
          </li>
        </ul>
      </nav>
    `;
    container.innerHTML = html;
  }
  