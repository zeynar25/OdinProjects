export default function reverseString(str) {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }

  return str.split("").reverse().join("");
}
