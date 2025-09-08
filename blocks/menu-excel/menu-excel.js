import {
    renderBlock
} from '../../scripts/faintly.js';

function attachEventListeners(block, groupedArray, grouped, selectedMain, textcomp) {
    const mainMenuWrapper = block.querySelector('.main-menu-wrapper');
    const dropdown = mainMenuWrapper.querySelector('.main-menu-dropdown');

    block.querySelectorAll('.submenu-wrapper').forEach((wrapper) => {
        const hasSubmenu = wrapper.querySelector('.submenu-column');
        if (!hasSubmenu) {
            wrapper.style.display = 'none';
        }
    });
    // // Toggle dropdown
    // mainMenuWrapper.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     const isVisible = dropdown.style.display === 'block';
    //     dropdown.style.display = isVisible ? 'none' : 'block';
    //     mainMenuWrapper.querySelector('.main-menu-arrow').textContent = isVisible ? '▶' : '▼';
    // });

    // // Close dropdown on outside click
    // document.addEventListener('click', () => {
    //     dropdown.style.display = 'none';
    //     mainMenuWrapper.querySelector('.main-menu-arrow').textContent = '▶';
    // });

    mainMenuWrapper.addEventListener('click', (e) => {
  e.stopPropagation();

  const isVisible = dropdown.style.display === 'block';
  dropdown.style.display = isVisible ? 'none' : 'block';

  const arrow = mainMenuWrapper.querySelector('.main-menu-arrow');
  arrow.classList.toggle('expanded', !isVisible); // Add 'expanded' when visible
});

    // Handle main menu selection
    dropdown.querySelectorAll('li[data-fly-menu-item]').forEach((li) => {
        li.addEventListener('click', async (e) => {
            e.stopPropagation();
            const newSelectedMain = li.textContent;


            // Update label immediately
            mainMenuWrapper.querySelector('.label').textContent = newSelectedMain;

            // Re-render with new selection
            await renderBlock(block, {
                textcomp,
                groupedArray,
                selectedMain: newSelectedMain,
                isSelectedMain: (context) => context.sub.itemkey === newSelectedMain,
            });


            // Reattach event listeners after render
            attachEventListeners(block, groupedArray, grouped, newSelectedMain, textcomp);
        });
    });
}

export default async function decorate(block) {
    const rawPath = block.querySelector('a')?.getAttribute('href');
    const text = block.querySelectorAll('p');
    let textcomp = text[1].innerHTML;
    if (!rawPath) return;

    const fetchUrl = new URL(rawPath, window.location.origin).href;
    const response = await fetch(fetchUrl);
    const json = await response.json();
    const {
        data
    } = json;

    // Group data
    const grouped = {};
    data.forEach((item) => {
        const main = item['main-menu'];
        const sub = item['sub-menu'];
        const menuItem = {
            title: item.menu,
            link: item.link
        };

        if (!grouped[main]) grouped[main] = {};
        if (!grouped[main][sub]) {
            grouped[main][sub] = [];
            grouped[main][sub].link1 = item.link1;
        }
        grouped[main][sub].push(menuItem);
    });

    // Default selection
    let selectedMain = Object.keys(grouped)[0];

    // Convert grouped data to array
    const groupedArray = Object.entries(grouped).map(([itemkey, itemvalue]) => {
        const submenuArray = Object.entries(itemvalue).map(([subkey, subvalue]) => ({
            subkey,
            subvalue,
            link1: subvalue.link1,
        }));

        return {
            itemkey,
            submenuArray,
        };
    });

    // Initial render
    await renderBlock(block, {
        groupedArray,
        textcomp,
        selectedMain,
        isSelectedMain: (context) => context.sub.itemkey === selectedMain,
    });

    // Attach listeners
    attachEventListeners(block, groupedArray, grouped, selectedMain, textcomp);
}