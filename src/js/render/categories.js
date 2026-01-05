// JavaScript file to render the category breakdown.
const LEFT_BAR_LENGTH = 28;
const FULL_BLOCK = "#";
const EMPTY_BLOCK = "-";

export function renderCategoryList(data, monthlySpending) {
  const container = document.getElementById("category-breakdown-container");

  const categoryMap = {};
  data.forEach(item => {
    categoryMap[item.category] = (categoryMap[item.category] ?? 0) + item.mprice;
  });

  const categories = Object.keys(categoryMap).sort();

  container.innerHTML = categories.map(category => {
    const totalMPrice = categoryMap[category];
    const numFull = monthlySpending === 0 ? 0 : Math.round((totalMPrice / monthlySpending) * LEFT_BAR_LENGTH);
    const numEmpty = LEFT_BAR_LENGTH - numFull;
    const barString = FULL_BLOCK.repeat(numFull) + EMPTY_BLOCK.repeat(numEmpty);

    return `
      <div class="content-item-left-data">
        <div class="name-left">${category}</div>
        <div class="price-left">$${totalMPrice.toFixed(2)}</div>
        <div class="bar-container-left">|${barString}|</div>
      </div>
    `;
  }).join("");
}
