// JavaScript file to render the subscription summaries.
export function updateSummary(item) {
  document.getElementById('summary-name-right').innerText = `--Summary of ${item.name}`;
  document.getElementById('s-weekly').innerText = `$${(item.price / 4).toFixed(2)}`;
  document.getElementById('s-monthly').innerText = `$${item.price}`;
  document.getElementById('s-yearly').innerText = `$${(item.price * 12).toFixed(2)}`;
  document.getElementById('s-cycle').innerText = item.cycle ?? ""; // Note the '??' operator is used in case the value is null or undefined
  document.getElementById('s-renew').innerText = item.renew ?? "";
  document.getElementById('s-email').innerText = item.email ?? "";
  document.getElementById('s-shared').innerText = item.share ?? "";
  document.getElementById('s-category').innerText = item.category ?? "";
}

export function renderFinalSummary({ weeklySpending, monthlySpending, yearlySpending, maxPricePercent }) {
  document.getElementById("weekly-spending").innerText = `$${weeklySpending.toFixed(2)}`;
  document.getElementById("monthly-spending").innerText = `$${monthlySpending.toFixed(2)}`;
  document.getElementById("yearly-spending").innerText = `$${yearlySpending.toFixed(2)}`;
}
