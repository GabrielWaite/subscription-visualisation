// JavaScript file to render today's date information.
export function renderToday() {
    document.getElementById("footer-date").innerText = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
}
