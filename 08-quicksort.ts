function qs(array: number[], start: number, end: number) {
  if (start >= end) return;

  const pivot = partition(array, start, end);
  qs(array, start, pivot - 1);
  qs(array, pivot + 1, end);
}

function partition(array: number[], start: number, end: number) {
  const pivot = array[end];
  let index = start - 1;
  let temp: number;

  for (let i = start; i < end; i++) {
    if (array[i] <= pivot) {
      index++;

      temp = array[i];
      array[i] = array[index];
      array[index] = temp;
    }
  }

  index++;

  array[end] = array[index];
  array[index] = pivot;

  return index;
}

function quicksort(array: number[]) {
  qs(array, 0, array.length - 1);
}

const arr = [6, 2, 3, 9, 4, 1, 7, 8, 5, 3, 10, 5, 8];
console.log(arr);

quicksort(arr);
console.log(arr);
