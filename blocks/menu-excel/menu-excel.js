import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  const response = await fetch(rawPath);
  const json = await response.json();
  const data = json.data || [];

  const grouped = {};
  data.forEach(item => {
    const main = item["main-menu"];
    if (!grouped[main]) grouped[main] = [];
    grouped[main].push(item);
  });

  let selectedMain = Object.keys(grouped)[0];
  let dropdownOpen = false;

  await renderBlock(block, {
    selectedMain,
    mainMenus: Object.keys(grouped),
    dropdownOpen,
  }, {
    eventHandlers: {
      'main-toggle': () => {
        dropdownOpen = !dropdownOpen;
        render();
      },
      ...Object.fromEntries(
        Object.keys(grouped).map(menu => [
          `select-${menu}`,
          () => {
            selectedMain = menu;
            dropdownOpen = false;
            render();
          }
        ])
      )
    }
  });

  async function render() {
    await renderBlock(block, {
      selectedMain,
      mainMenus: Object.keys(grouped),
      dropdownOpen,
    }, {
      eventHandlers: {
        'main-toggle': () => {
          dropdownOpen = !dropdownOpen;
          render();
        },
        ...Object.fromEntries(
          Object.keys(grouped).map(menu => [
            `select-${menu}`,
            () => {
              selectedMain = menu;
              dropdownOpen = false;
              render();
            }
          ])
        )
      }
    });
  }
}
