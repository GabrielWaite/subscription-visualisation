// JavaScript file to tie all modules together.
import { loadData } from "./dataLoader.js";
// compute
import { computeSubscriptionSpending } from "./compute.js";
// render
import { renderSubscriptionList } from "./render/subscriptions.js";
import { renderCategoryList } from "./render/categories.js";
import { renderMonthlySpendingList } from "./render/monthlySpending.js";
import { renderFinalSummary } from "./render/summary.js";
import { renderToday } from "./render/today.js";


async function main() {
  const data = await loadData();

  const totals = computeSubscriptionSpending(data);

  renderSubscriptionList(data);
  renderCategoryList(data, totals.monthlySpending);
  renderMonthlySpendingList(data, totals.monthlySpending);
  renderFinalSummary(totals);
  renderToday();

}

main().catch(err => {
  // show an obvious error on the page (better than “blank page”)
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<pre style="color:red;white-space:pre-wrap">ERROR:\n${err.stack ?? err}</pre>`
  );
});
