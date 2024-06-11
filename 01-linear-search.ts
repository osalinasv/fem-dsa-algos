function linearSearch<T>(array: T[], value: T) {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === value) return index;
  }

  return -1;
}

const arr = [0, 1, 2, 3, 4, 5];
console.log(arr, linearSearch(arr, 4));
