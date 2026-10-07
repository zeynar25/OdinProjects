function fibs(n) {
  if (n == 0) {
    return 0;
  }

  let prev = 0;
  let prev2 = 1;
  for (let i = 1; i <= n; i++) {
    prev = prev + prev2;
    prev2 = prev - prev2;
  }
  return prev;
}

function fibsRec(n) {
  if (n == 0) {
    return 0;
  }

  if (n == 1) {
    return 1;
  }

  return fibsRec(n - 1) + fibsRec(n - 2);
}

function sort(arr) {
  let low = 0;
  let high = arr.length - 1;

  function mergeSort(low, high) {
    if (low < high) {
      let mid = Math.floor((low + high) / 2);

      mergeSort(low, mid);
      mergeSort(mid + 1, high);
      merge(arr, low, mid, high);
    }
  }
  mergeSort(low, high);
}

function merge(arr, low, mid, high) {
  const merged = [];
  let leftPointer = low;
  let rightPointer = mid + 1;

  while (leftPointer <= mid && rightPointer <= high) {
    if (arr[leftPointer] <= arr[rightPointer]) {
      merged.push(arr[leftPointer]);
      leftPointer++;
    } else {
      merged.push(arr[rightPointer]);
      rightPointer++;
    }
  }

  // Copy any remaining elements from the left subarray
  while (leftPointer <= mid) {
    merged.push(arr[leftPointer]);
    leftPointer++;
  }

  // Copy any remaining elements from the right subarray
  while (rightPointer <= high) {
    merged.push(arr[rightPointer]);
    rightPointer++;
  }

  // Copy the merged elements back to the original array
  for (let i = 0; i < merged.length; i++) {
    arr[low + i] = merged[i];
  }
}

console.log("This was printed recursively");
console.log("calling iterative fibs with 8: " + fibs(8));
console.log("calling recursive fibs with 8: " + fibsRec(8));

console.log("merge sorting [9, 3, 5, 1, 4, 2, 8, 7, 6]: ");
let arr = [9, 3, 5, 1, 4, 2, 8, 7, 6];
sort(arr);
console.log(arr);
