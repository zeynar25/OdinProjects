export default function capitalize(s) {
  if (typeof s !== "string") {
    throw new Error("Input must be a string");
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}
