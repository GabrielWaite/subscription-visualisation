// JavaScript file to compute subscription spending and date information.
// -!-Retire the relative price information-!-
// |_ remove the item.percent value.
export function computeSubscriptionSpending(data) {
  let weeklySpending = 0;
  let monthlySpending = 0;
  let yearlySpending = 0;
  // let maxPrice = 0;

  // compute totals
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

    // if (item.price > maxPrice) maxPrice = item.price;
  });

  // derived per-item values
  data.forEach((item) => {
    // item.percent = maxPrice === 0 ? 0 : (item.price / maxPrice) * 100;
    item.mprice =
      item.cycle === "weekly" ? item.price * 4 :
      item.cycle === "monthly" ? item.price :
      item.price / 12;
  });

  // const maxPricePercent = monthlySpending === 0
  //   ? 0
  //   : Math.max(...data.map(item => (item.mprice / monthlySpending) * 100));

  return { weeklySpending, monthlySpending, yearlySpending };
}

// item.renew is stored as "dd-mm"
function parseRenewDate(renewStr) {
  const [day, month] = renewStr.split("-").map(Number);

  return { day, month };
}

// compare a given day and month to today
// return two difference values: diffDays and diffMonths
function daysUntilRenew(day, month, today = new Date()) {
  const [todayDay, todayMonth] = [today.getDate(), today.getMonth() + 1];

  // if (month < todayMonth || (month === todayMonth && day < todayDay)) {
  //   // If the renewal date is in the past, it refers to next year
  //   month += 12;
  // }

  // const diffMonths = month - todayMonth;
  // const diffDays = day - todayDay;

  // return { diffDays, diffMonths };
}

// Find which item renews next
// Said item will minimise both the diffMonths and diffDays
export function computeNextRenewalItem(data, today = new Date()) {
  const [todayDay, todayMonth] = [today.getDate(), today.getMonth() + 1];
  // Return three values: name, price, date
  let nextItemName = null;
  let nextItemPrice = null;
  let nextItemDate = null;
};

