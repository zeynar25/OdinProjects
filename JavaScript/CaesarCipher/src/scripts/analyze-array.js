export default function analyzeArray(arr) {
  const analyzedArray = {
    length: arr.length,
  };

  let average = 0;
  let min = Infinity;
  let max = -Infinity;

  for (const num of arr) {
    average += num;
    if (num < min) min = num;
    if (num > max) max = num;
  }

  analyzedArray.average = average / arr.length;
  analyzedArray.min = min;
  analyzedArray.max = max;

  return analyzedArray;
}
