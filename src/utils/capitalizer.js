export function capitalize(name) {
  return name.replace(/-/, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
