function bubbleSort(array: number[]) {
  let temp: number;

  for (let limit = array.length; limit > 1; limit--) {
    for (let i = 0; i < limit - 1; i++) {
      if (array[i] > array[i + 1]) {
        temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
    }
  }

  return array;
}

const arr = [1, 3, 7, 4, 2];
console.log(arr);
console.log(bubbleSort(arr));
