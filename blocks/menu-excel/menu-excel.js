export default async function decorate(block) {
    //const link = block.querySelector("a");
   // const rawPath = link.getAttribute("href");
   const rawPath = block.querySelector("a")?.getAttribute("href");
   const fetchUrl = new URL(rawPath, window.location.origin).href;
   const response = await fetch(fetchUrl);
   const json = await response.json();
   console.log("Fetched JSON:", json);

  }
  