import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  await renderBlock(block, {
    imgsrc: block.children[0]?.querySelector('img')?.getAttribute('src'),
    imgalt: block.children[0]?.querySelector('img')?.getAttribute('alt'),
    text: block.children[1]?.innerText?.trim(),
    bannervariant: block?.children[2]?.innerText?.trim(),
    test: (context) => context.bannervariant === 'rilt',
  });
}