import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  console.log('Running decorate()');

  await renderBlock(block, {
    render: () => {
      const el = document.createElement('div');
      el.textContent = '✔ Block rendered via renderBlock';
      return el;
    },
    test: () => true,
  });
}
