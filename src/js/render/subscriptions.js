// JavaScript file to update subscription information.
// We must import two additional modules.
import { getCategoryColour } from "../colours.js";
import { updateSummary } from "./summary.js";

export function renderSubscriptionList(data) {
  const container = document.getElementById("list-container");

  container.innerHTML = data.map((item, index) => {
    const categoryColour = getCategoryColour(item.category);
    return `
      <div class="content-item" data-index="${index}">
        <div class="name">${item.name}</div>
        <div class="price">$${item.price}</div>
        <div class="renewal-date">${item.renew}</div>
        <div class="category" style="color: ${categoryColour}">${item.category}</div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".content-item").forEach(row => {
    row.addEventListener("mouseenter", () => {
      const index = Number(row.getAttribute("data-index"));
      updateSummary(data[index]);
    });
  });
}
