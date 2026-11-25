export function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort();
}
