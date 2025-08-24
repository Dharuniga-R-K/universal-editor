import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
    const rawPath = block.querySelector("a")?.getAttribute("href");

    if (!rawPath) return;

    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const data = json.data;

    // Group data by main-menu
    const grouped = {};
    data.forEach(item => {
        const main = item["main-menu"];
        if (!grouped[main]) grouped[main] = [];
        grouped[main].push(item);
    });

    const mainMenus = Object.keys(grouped);
    let selectedMain = mainMenus[0];
    const submenus = Object.entries(grouped[selectedMain]).map(([submenu, items]) => ({
        title: submenu,
        link: items[0].link1 || items[0].link,
        items: items.map(item => ({ title: item.menu, link: item.link }))
    }));

    await renderBlock(block, {
        mainMenus,
        selectedMain,
        submenus,
    });

    // Event listeners for dropdown functionality
    const mainMenuButton = block.querySelector('.main-menu-wrapper');
    const dropdown = block.querySelector('.main-menu-dropdown');

    mainMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = dropdown.style.display === "block";
        dropdown.style.display = isVisible ? "none" : "block";
        mainMenuButton.querySelector('.main-menu-arrow').textContent = isVisible ? "▶" : "▼";
    });

    mainMenuButton.querySelectorAll('[data-fly-menu-item]').forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedMain = e.target.innerText;
            mainMenuButton.querySelector('.label').textContent = selectedMain;
            dropdown.style.display = "none";
            mainMenuButton.querySelector('.main-menu-arrow').textContent = "▶";

            // Update submenus based on selected main menu
            const newSubmenus = Object.entries(grouped[selectedMain]).map(([submenu, items]) => ({
                title: submenu,
                link: items[0].link1 || items[0].link,
                items: items.map(item => ({ title: item.menu, link: item.link }))
            }));

            // Render new submenus
            const submenuWrapper = block.querySelector('.submenu-wrapper');
            submenuWrapper.innerHTML = newSubmenus.map(submenu => `
                <div class="submenu-column">
                    <a class="submenu-title" href="${submenu.link}" target="_blank">${submenu.title}</a>
                    <ul>
                        ${submenu.items.map(item => `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`).join('')}
                    </ul>
                </div>
            `).join('');
        });
    });
}
