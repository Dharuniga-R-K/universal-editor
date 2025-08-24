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

    // Initialize submenus based on the selected main menu
    const submenus = grouped[selectedMain].map(item => ({
        title: item["sub-menu"],
        link: item.link1 || item.link, // Fallback to link1 if available
        items: [{ title: item.menu, link: item.link }]
    }));

    // Render the block with the correct values
    await renderBlock(block, {
        mainMenus: mainMenus, // Ensure this is passed correctly
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
            const newSubmenus = grouped[selectedMain].map(item => ({
                title: item["sub-menu"],
                link: item.link1 || item.link,
                items: [{ title: item.menu, link: item.link }]
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

    // Render initial submenus
    const submenuWrapper = block.querySelector('.submenu-wrapper');
    submenuWrapper.innerHTML = submenus.map(submenu => `
        <div class="submenu-column">
            <a class="submenu-title" href="${submenu.link}" target="_blank">${submenu.title}</a>
            <ul>
                ${submenu.items.map(item => `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`).join('')}
            </ul>
        </div>
    `).join('');
}
