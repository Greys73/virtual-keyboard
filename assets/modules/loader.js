export default async function loadJSON(file) {
  const response = await fetch(file);
  const json = await response.json();
  return json;
}
