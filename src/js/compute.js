// JavaScript file to compute subscription spending.
export function computeAll(data) {
  let weeklySpending = 0;
  let monthlySpending = 0;
  let yearlySpending = 0;
  let maxPrice = 0;

  // compute totals + max price
  data.forEach((item) => {
    if (item.cycle === "weekly") {
      weeklySpending += item.price;
      monthlySpending += item.price * 4;
      yearlySpending += item.price * 52;
    } else if (item.cycle === "monthly") {
      weeklySpending += item.price / 4;
      monthlySpending += item.price;
      yearlySpending += item.price * 12;
    } else if (item.cycle === "yearly") {
      weeklySpending += item.price / 52;
      monthlySpending += item.price / 12;
      yearlySpending += item.price;
    }

    if (item.price > maxPrice) maxPrice = item.price;
  });

  // derived per-item values
  data.forEach((item) => {
    item.percent = maxPrice === 0 ? 0 : (item.price / maxPrice) * 100;
    item.mprice =
      item.cycle === "weekly" ? item.price * 4 :
      item.cycle === "monthly" ? item.price :
      item.price / 12;
  });

  const maxPricePercent = monthlySpending === 0
    ? 0
    : Math.max(...data.map(item => (item.mprice / monthlySpending) * 100));

  return { weeklySpending, monthlySpending, yearlySpending, maxPricePercent };
}