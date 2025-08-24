export default async function decorate(block) {
  const rawPath = block.querySelector('a')?.getAttribute('href');
  if (!rawPath) {
    block.textContent = "No data source found.";
    return;
  }

  try {
    const response = await fetch(rawPath);
    if (!response.ok) throw new Error('Network response not ok');
    const json = await response.json();
    const data = json.data || [];

    if (data.length === 0) {
      block.textContent = "No menu data available.";
      return;
    }

    // Just render main menu items as a simple list for testing
    const ul = document.createElement('ul');
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item["main-menu"];
      ul.appendChild(li);
    });

    block.innerHTML = '';
    block.appendChild(ul);

  } catch (e) {
    block.textContent = "Error loading menu data.";
    console.error(e);
  }
}
