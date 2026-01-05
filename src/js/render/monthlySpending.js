// JavaScript file to render the monthly spending breakdown.
const LEFT_BAR_LENGTH = 28;
const FULL_BLOCK = "#";
const EMPTY_BLOCK = "-";

export function renderMonthlySpendingList(data, monthlySpending) {
  const container = document.getElementById("monthly-spending-breakdown-container");
  let numEmptyBefore = 0;

  container.innerHTML = data.map(item => {
    const percentOfMonthly = monthlySpending === 0 ? 0 : (item.mprice / monthlySpending) * 100;
    const numFull = monthlySpending === 0 ? 0 : Math.round((item.mprice / monthlySpending) * LEFT_BAR_LENGTH);
    const numEmptyAfter = Math.max(0, LEFT_BAR_LENGTH - numEmptyBefore - numFull);
    const barString = EMPTY_BLOCK.repeat(numEmptyBefore) + FULL_BLOCK.repeat(numFull) + EMPTY_BLOCK.repeat(numEmptyAfter);
    numEmptyBefore += numFull;

    return `
      <div class="content-item-left-data">
        <div class="name-left">${item.name}</div>
        <div class="price-left">${percentOfMonthly.toFixed(1)}%</div>
        <div class="bar-container-left">|${barString}|</div>
      </div>
    `;
  }).join("");
}
