// Generate some sample data to work with
const data = [
  {
    name: "Netflix",
    price: 15,
    cycle: "monthly",
    email: "netflix@example.com",
    share: "Alice, Bob",
    renew: "14-09",
    percent: NaN, // to be computed later
    category: "Streaming",
    mprice: NaN // to be computed later
  },
  {
    name: "Hulu",
    price: 12,
    cycle: "monthly",
    email: "hulu@example.com",
    share: "Bob",
    renew: "20-11",
    percent: NaN, // to be computed later
    category: "Streaming",
    mprice: NaN // to be computed later
  },
  {
    name: "Disney+",
    price: 10,
    cycle: "monthly",
    email: "disney@example.com",
    share: "Charlie, Eve",
    renew: "25-03",
    percent: NaN, // to be computed later
    category: "Streaming",
    mprice: NaN // to be computed later
  },
  {
    name: "Phone Plan",
    price: 8.99,
    cycle: "monthly",
    email: "phone@example.com",
    share: NaN,
    renew: "02-01",
    percent: NaN, // to be computed later
    category: "Lifestyle",
    mprice: NaN // to be computed later
  },
];

// --- Constants ---
const RELATIVE_PRICE_BAR_LENGTH = 43; // The length of the relative price bar
const LEFT_BAR_LENGTH = 28; // The length of the relative price bar
const FULL_BLOCK = "#";
const EMPTY_BLOCK = "-";

// We need to compute the following:
// + weeklySpending
// + monthlySpending
// + yearlySpending
// + percent -> that isFinite, for the current data set, find the max price, then for each item compute (item.price / maxPrice) * 100. Add this to each item.

// Note that each of the <>Spending values need to be changed for every new item added.

// --- Spender, Percentage & Monthly Price Computation ---
function computeSpendings() {
  let weeklySpending = 0;
  let monthlySpending = 0;
  let yearlySpending = 0;

  let maxPrice = 0;

  data.forEach((item) => {
    // Compute spendings
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

    // Find max price
    if (item.price > maxPrice) {
      maxPrice = item.price;
    }
  });

  // Compute relative price percent
  data.forEach((item) => {
    item.percent = (item.price / maxPrice) * 100;
  });

  // Compute monthly price
  data.forEach((item) => {
    item.mprice = item.cycle === "weekly" ? item.price * 4 : item.cycle === "monthly" ? item.price : item.price / 12;
  });

  return {
    weeklySpending,
    monthlySpending,
    yearlySpending,
  };
}

const { weeklySpending, monthlySpending, yearlySpending } = computeSpendings();

// Compute largest spending percentage (percent of monthly spending)
const maxPricePercent = Math.max(...data.map(item => (item.mprice / monthlySpending) * 100));


// --- Render Subscription List ---
function renderSubscriptionList() {
  const container = document.getElementById("list-container"); // The container to hold the list

  container.innerHTML = data.map((item, index) => {
    // Calculate blocks for relative price bar
    const numFull = Math.round((item.percent / 100) * RELATIVE_PRICE_BAR_LENGTH);
    const numEmpty = RELATIVE_PRICE_BAR_LENGTH - numFull;
    const barString = FULL_BLOCK.repeat(numFull) + EMPTY_BLOCK.repeat(numEmpty);

      // Add data-index attribute for hover functionality
      return `
                    <div class="content-item" data-index="${index}">
                        <div class="name">${item.name}</div>
                        <div class="price">$${item.price}</div>
                        <div class="renewal-date">${item.renew}</div>
                        <div class="bar-container">|${barString}|</div>
                    </div>
                `;
    })
    .join("");
    // Add Hover Listeners
    const rows = container.querySelectorAll('.content-item');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const index = row.getAttribute('data-index');
            updateSummary(data[index]);
        });
    });
}

function updateSummary(item) {
    document.getElementById('summary-name-right').innerText = `--Summary of ${item.name}`;
    document.getElementById('s-weekly').innerText = `$${(item.price / 4).toFixed(2)}`;
    document.getElementById('s-monthly').innerText = `$${item.price}`;
    document.getElementById('s-yearly').innerText = `$${(item.price * 12).toFixed(2)}`;
    document.getElementById('s-cycle').innerText = "Monthly"; 
    document.getElementById('s-renew').innerText = `${item.renew}`;
    document.getElementById('s-email').innerText = item.email;
    document.getElementById('s-shared').innerText = item.share;
}

renderSubscriptionList(); // Call the function to render the list
// --- Render Category List ---
function renderCategoryList() {
  const container = document.getElementById("category-breakdown-container"); // The container to hold the list

  // Group by category -> compute total monthly price per category -> order alphabetical
  const categoryMap = {};

  data.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = 0;
    }
    categoryMap[item.category] += item.mprice;
  }); 

  const categories = Object.keys(categoryMap).sort(); // Sort alphabetically

  container.innerHTML = categories.map((category) => {
    const totalMPrice = categoryMap[category];

    // Calculate blocks for bar
    const numFull = Math.round((totalMPrice / monthlySpending) * LEFT_BAR_LENGTH);
    const numEmpty = LEFT_BAR_LENGTH - numFull;
    const barString = FULL_BLOCK.repeat(numFull) + EMPTY_BLOCK.repeat(numEmpty);
    
      return `
                    <div class="content-item-left-data">
                        <div class="name-left">${category}</div>
                        <div class="price-left">$${totalMPrice.toFixed(2)}</div>
                        <div class="bar-container-left">|${barString}|</div>
                    </div>
                `;
    })
    .join("");
}

renderCategoryList(); // Call the function to render the category list

// --- Render Percentage of Monthly Spending ---
function renderMonthlySpendingList() {
  const container = document.getElementById("monthly-spending-breakdown-container"); // The container to hold the list
  let numEmptyBefore = 0; // To keep track of previous width for bar calculation

  container.innerHTML = data.map((item) => {
    const percentOfMonthly = (item.mprice / monthlySpending) * 100;
    const numFull = Math.round((item.mprice / monthlySpending) * LEFT_BAR_LENGTH);
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
    })
    .join("");
}

renderMonthlySpendingList(); // Call the function to render the monthly spending list

// --- Render Final Sumarry ---
// "weekly-spending"
// "monthly-spending"
// "yearly-spending"
// "largest-spending"
// "category-breakdown" : Streaming (x%), Lifestyle (y%), ...
// "next-renewal"
document.getElementById("weekly-spending").innerText = `$${weeklySpending.toFixed(2)}`;
document.getElementById("monthly-spending").innerText = `$${monthlySpending.toFixed(2)}`;
document.getElementById("yearly-spending").innerText = `$${yearlySpending.toFixed(2)}`;
document.getElementById("largest-spending").innerText = `${maxPricePercent.toFixed(1)}%`;
// "category-breakdown" will come later...
// next-renewal will come later...