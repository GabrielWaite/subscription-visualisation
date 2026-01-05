// JavaScript file to load subscription data.
export async function loadData() {
  const url = new URL("../assets/sample-data.json", import.meta.url);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to load JSON: ${res.status} ${res.statusText} (${url})`);
  }
  return await res.json();
}