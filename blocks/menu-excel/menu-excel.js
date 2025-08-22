import { renderBlock } from '../../scripts/faintly.js';



export default async function decorate(block) {
  const jsonPath = block.querySelector("a")?.getAttribute("href");
  console.log("Before renderBlock", jsonPath);
  
  await renderBlock(block, {
    jsonPath,
    test: context => Boolean(context.jsonPath),
  });
  
  console.log("After renderBlock");

  await buildMenu(block, jsonPath);
}
