function binarySearch<T>(array: T[], value: T) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (array[mid] === value) return mid;
    if (array[mid] < value) left = mid + 1;
    else right = mid;
  }

  return -1;
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr);
console.log(6, binarySearch(arr, 6));
console.log(0, binarySearch(arr, 0));
console.log(9, binarySearch(arr, 9));
console.log(10, binarySearch(arr, 10));
